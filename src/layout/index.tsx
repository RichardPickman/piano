'use client';

import { useRef } from 'react';
import { Card } from '../components/Card';
import { FloatCard } from '../components/FloatCard';
import { MainContainer } from '../components/MainContainer';
import { NoteItem } from '../components/Note';
import { LAYOUT_GAP } from '../constants';
import { useFloatValues } from '../hooks/useFloatValues';
import { useLayout } from '../hooks/useLayout';
import { ClickEvent, NoteAttributes } from '../types';
import { cn } from '../utils';
import { Primary } from './elements/Primary';
import { Secondary } from './elements/Secondary';
import { m } from 'framer-motion';

interface Props {
    currentNote: NoteAttributes | null;
    notes: NoteAttributes[];
    onClick: (note: NoteAttributes) => void;
    onRemove: () => void;
}

/**
 * Layout component defined to control width of 2 columns. Primary column contains current note, secondary column is for listing all cards
 *
 * @param currentNote NoteAttribute argument for primary content
 * @param notes NoteAttribute array argument for cards render
 * @param onClick callback for choosing current note
 * @param onRemove callback for removing current note
 */

export const Layout = ({ currentNote, notes, onClick, onRemove }: Props) => {
    const container = useRef<HTMLDivElement | null>(null);
    const { isActive, rect, renderFloatCard } = useFloatValues();
    const layout = useLayout(container, !!currentNote);

    const handleCardClick = (event: ClickEvent) => {
        const index = Number(event.currentTarget.id);
        renderFloatCard(event.currentTarget.getBoundingClientRect());
        onClick(notes[index]);
    };

    const floatData = {
        shouldAppear: isActive,
        rect,
        containerRect: layout.containerRect,
        attributes: currentNote,
    };

    return (
        <main
            className={cn(
                'relative flex h-screen justify-center px-6 py-4 text-white',
                isActive && 'cursor-wait',
            )}
        >
            <FloatCard floatData={floatData} />
            <div
                ref={container}
                className={cn(
                    'relative flex h-full w-full max-w-7xl',
                    isActive && 'pointer-events-none',
                )}
                style={{ gap: LAYOUT_GAP }}
            >
                <Primary key={currentNote?.id} width={layout.mainWidth}>
                    {currentNote && (
                        <MainContainer
                            currentNote={currentNote}
                            onRemove={onRemove}
                        />
                    )}
                </Primary>
                <Secondary width={layout.secondaryWidth}>
                    {notes &&
                        notes.map((item, index) => (
                            <m.div
                                key={item.id}
                                className="aspect-video h-fit w-full cursor-pointer rounded border bg-slate-600"
                                id={String(index)}
                                onClick={handleCardClick}
                                style={{ width: layout.cardWidth }}
                            >
                                <NoteItem
                                    key={item.id}
                                    attributes={notes[index]}
                                />
                            </m.div>
                        ))}
                </Secondary>
            </div>
        </main>
    );
};
