import { INote } from "@/types";
import { useState, useCallback, act, useMemo } from "react";
export function useSelectNote(
    active_note: number | null | undefined = null,
    notes: INote[]
) {
    const [active, setActive] = useState(active_note);

    const activeNoteId = useMemo(() => {
        console.log("calling");
        if (!(active_note || active)) {
            return null;
        }
        const note = notes?.filter((note) => note.id === active);
        if (note?.length) {
            return note[0].id;
        } else {
            return null;
        }
    }, [active]);
    const changeActiveNote = useCallback((activeNoteId: number | null) => {
        console.log("here", activeNoteId);
        setActive(activeNoteId);
    }, []);

    return { activeNoteId, changeActiveNote };
}
