"use client";

import { Layout } from "@/layout";
import { Notes } from "@/providers/NotesProvider";
import { LazyMotion, domAnimation } from "framer-motion";
import { useContext } from "react";

export default function Home() {
    const { notes, currentNote, onNoteChange } = useContext(Notes);
    const filteredNotes = notes.filter((item) => item !== currentNote);

    return (
        <LazyMotion features={domAnimation}>
            <Layout
                currentNote={currentNote}
                notes={filteredNotes}
                onClick={onNoteChange}
                onRemove={() => onNoteChange(null)}
            />
        </LazyMotion>
    );
}
