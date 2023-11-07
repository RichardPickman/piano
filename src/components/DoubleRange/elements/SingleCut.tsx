import { useCallback, useEffect, useRef, useState } from 'react';
import { ClickEvent } from '../../../types';
import { Cut } from '../../../types/doubleRange';

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
    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(0);

    const handlePosition = useCallback(() => {
        if (!container.current) {
            return;
        }

        const rect = container.current.getBoundingClientRect();
        const onePercent = rect.width / 100;

        setLeft(onePercent * start);
        setRight(onePercent * end);
    }, [container, start, end, setLeft, setRight]);

    useEffect(() => {
        if (container.current) {
            handlePosition();
        }
    }, [container, handlePosition]);

    useEffect(() => {
        window.addEventListener('resize', handlePosition);

        return () => {
            window.removeEventListener('resize', handlePosition);
        };
    }, [handlePosition]);

    return (
        <div ref={container} className="absolute h-full w-full bg-transparent">
            <div
                className="absolute h-full"
                style={{
                    width: right - left,
                    left,
                    right,
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
            </div>
        </div>
    );
};
