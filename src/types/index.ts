import { UUID } from 'crypto';
import { MouseEvent } from 'react';

export interface Note {
    start: number;
    end: number;
    pitch: number;
    duration: number;
    velocity: number;
}

export interface CurrentNote {
    id: number;
    notes: Note[];
}

export type Attributes = {
    id: string;
    fill: string;
    fillOpacity?: number;
};

export type Rect = {
    x: number;
    y: number;
    width: number;
    height: number;
} & Attributes;

export type Line = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    strokeWidth: string;
    stroke: string;
} & Attributes;

export type NoteAttributes = {
    id: string;
    rectangulars: Rect[];
    blanks: Rect[];
    lines: Line[];
};

export type ClickEvent = MouseEvent<HTMLDivElement>;
