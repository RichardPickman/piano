import { memo } from 'react';
import { NoteAttributes } from '../../types';

interface Props {
    attributes: NoteAttributes;
}

/**
 * NoteItem is component that renders note svg. Takes full width of it's parent.
 *
 * @param attributes NoteAttribute argument for svg
 */

export const NoteItem = memo(({ attributes }: Props) => (
    <div className="relative z-0 aspect-video w-full rounded border bg-slate-400">
        <svg
            className="absolute h-full w-full bg-transparent"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2 1"
        >
            {attributes.blanks.map(item => (
                <rect key={item.id} {...item} />
            ))}
            {attributes.lines.map(item => (
                <line key={item.id} {...item} />
            ))}
        </svg>
        <svg
            className="absolute z-10 h-full w-full bg-transparent"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2 1"
        >
            {attributes.rectangulars.map(item => (
                <rect key={item.id} {...item} />
            ))}
        </svg>
    </div>
));

NoteItem.displayName = 'NoteItem';
