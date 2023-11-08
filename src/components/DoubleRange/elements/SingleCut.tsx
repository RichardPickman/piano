import { useCallback, useEffect, useRef, useState } from 'react';
import { ClickEvent } from '../../../types';
import { Cut } from '../../../types/doubleRange';
import { useMotionValue, m } from 'framer-motion';

interface Props {
    cut: Cut;
    onRemove: (event: ClickEvent) => void;
}

/**
 * Single Cut is a component that being rendered with selected values.
 *
 * @param cut values for single cut, such as { start, end, background, border }
 * @param onRemove callback to remove itself
 *
 */

export const SingleCut = ({ cut, onRemove }: Props) => {
    const container = useRef<HTMLDivElement | null>(null);
    const { start, end, background, border, notesAmount } = cut;
    const left = useMotionValue(0);
    const right = useMotionValue(0);

    // Personally I think it's overengineering, but I can't live knowing that cut being rendered with absolute values;
    const handleSize = useCallback(() => {
        if (container.current) {
            const rect = container.current.getBoundingClientRect();
            const onePercent = rect.width / 100;

            left.set(onePercent * start);
            right.set(onePercent * end);
        }
    }, [end, left, right, start]);

    useEffect(() => {
        if (container.current) {
            handleSize();
        }
    }, [container, handleSize]);

    useEffect(() => {
        window.addEventListener('resize', handleSize);

        return () => {
            window.removeEventListener('resize', handleSize);
        };
    }, [handleSize]);

    const width = right.get() - left.get();

    return (
        <div
            ref={container}
            className="pointer-events-none absolute h-full w-full bg-transparent"
        >
            <m.div
                className="absolute h-full"
                style={{
                    width,
                    left: left,
                    right: right,
                    backgroundColor: background,
                    borderLeft: `1px solid ${border}`,
                    borderRight: `1px solid ${border}`,
                }}
            >
                <div className="absolute bottom-0 w-full border bg-slate-300 px-1 py-1 text-black">
                    {notesAmount} notes
                </div>
                <div
                    onMouseDown={onRemove}
                    data-unique-id={background}
                    className="absolute right-0 top-0 z-10 flex cursor-pointer border px-2 py-0.5"
                >
                    x
                </div>
            </m.div>
        </div>
    );
};
