import { NotesProvider } from "@/providers/NotesProvider";
import { getNotes, getPianoNotes } from "@/services/notes";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Piano roll",
    description: "Created with love!",
};

export default async function RootLayout({
    children,
}: {
    children: ReactNode;
}) {
    const rawSeqences = await getPianoNotes();
    const notes = rawSeqences.map((item) => getNotes(item));

    return (
        <html lang="en">
            <body className={inter.className}>
                <NotesProvider notes={notes}>{children}</NotesProvider>
            </body>
        </html>
    );
}
