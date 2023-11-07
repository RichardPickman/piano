"use client";

import { NoteAttributes } from "@/types";
import { ReactNode, createContext, useState } from "react";

interface Props {
    notes: NoteAttributes[];
    children: ReactNode;
}

interface NoteContext {
    currentNote: NoteAttributes | null;
    notes: NoteAttributes[];
    onNoteChange: (note: NoteAttributes | null) => void;
}

export const Notes = createContext<NoteContext>({
    currentNote: null,
    notes: [],
    onNoteChange: (note) => {},
});

export const NotesProvider = ({ notes, children }: Props) => {
    const [currentNote, setCurrentNote] = useState<NoteAttributes | null>(null);

    const onNoteChange = (note: NoteAttributes | null) => setCurrentNote(note);

    return (
        <Notes.Provider value={{ currentNote, notes, onNoteChange }}>
            {children}
        </Notes.Provider>
    );
};
