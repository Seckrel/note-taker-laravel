import { useState, useCallback } from "react";
import { API, OutputData } from "@editorjs/editorjs";

const INIT_DATA: OutputData = {
    time: Date.now(),
    blocks: [
        {
            id: "sheNwCUP5A",
            type: "header",
            data: {
                text: "Untitled Document",
                level: 2,
            },
        },
    ],
};

export default function useRichText() {
    const [note, setNote] = useState(INIT_DATA);
    const updateNote = useCallback(async (api: API) => {
        const body = await api.saver.save();
        setNote(body);
    }, []);

    return { note, updateNote };
}
