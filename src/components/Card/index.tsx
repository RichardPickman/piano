import { MotionProps, m } from 'framer-motion';
import { ReactNode } from 'react';
import { ClickEvent } from '../../types';
import { cn } from '../../utils';

type Props = {
    children: ReactNode;
    className?: string;
    id?: number;
    onClick?: (event: ClickEvent) => void;
} & MotionProps;

export const Card = ({ children, className, onClick, id, ...props }: Props) => {
    return (
        <m.div
            className={cn(
                'aspect-video w-full rounded border bg-slate-600',
                className,
            )}
            id={String(id)}
            onClick={onClick}
            {...props}
        >
            {children}
        </m.div>
    );
};
