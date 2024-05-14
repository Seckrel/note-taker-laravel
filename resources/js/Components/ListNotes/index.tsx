import { OutputData } from "@editorjs/editorjs";
import { PropsWithChildren } from "react";
import PrimaryButton from "../PrimaryButton";
import { cn } from "@/lib/utils";

interface INotes {
    id: number;
    title: number;
    notes: OutputData;
}

export default function ListNote({
    notes,
    active_note,
    changeActiveNote,
}: PropsWithChildren<{
    notes: unknown[];
    active_note: number | null | undefined;
    changeActiveNote: (activeNoteId: number) => void;
}>) {
    active_note = active_note as number | null;

    if (!notes || !notes!.length) {
        return null;
    }

    return (
        <div className="flex flex-col gap-y-3">
            {(notes as INotes[]).map((note) => (
                <PrimaryButton
                    onClick={() => changeActiveNote(note.id)}
                    className={cn(
                        "dark:bg-transparent dark:text-white dark:hover:bg-white dark:hover:text-black",
                        active_note === note.id
                            ? "dark:bg-white dark:text-black disabled:pointer-events-none"
                            : null
                    )}
                    key={note.id}
                >
                    {note.title}
                </PrimaryButton>
            ))}
        </div>
    );
}
