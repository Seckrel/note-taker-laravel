import { useState, useCallback, useMemo, useEffect } from "react";
import { API, OutputData } from "@editorjs/editorjs";
import { INote } from "@/types";

export interface INoteData {
    id?: number | undefined;
    note: OutputData;
    title: string;
}

const INIT_DATA: INoteData = {
    title: "Untitled Note",
    note: {
        time: Date.now(),
        blocks: [
            {
                id: "sheNwCUP5A",
                type: "header",
                data: {
                    text: "Write Note Hear",
                    level: 2,
                },
            },
        ],
    },
};

export default function useRichText(
    activeNoteId: number | null | undefined,
    notes: INote[]
) {
    const [note, setNote] = useState(INIT_DATA);
    useEffect(() => {
        if (!activeNoteId) {
            setNote(INIT_DATA);
        } else {
            const note = notes.filter((note) => note.id === activeNoteId);
            if (note.length) {
                setNote(note[0]);
            } else {
                setNote(INIT_DATA);
            }
        }
    }, [activeNoteId, notes]);
    const updateNote = useCallback(
        async (
            {
                api,
                title,
            }: { api?: API | undefined; title?: string | undefined } = {
                api: undefined,
                title: undefined,
            }
        ) => {
            if (title) {
                setNote((prev) => ({ ...prev, title: title }));
            } else if (api) {
                const body = await api.saver.save();
                setNote((prev) => ({ ...prev, note: body }));
            }
        },
        []
    );

    return { note, updateNote };
}
