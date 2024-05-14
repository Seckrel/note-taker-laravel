import "./style.local.css";
import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./constant";
import { PropsWithChildren } from "react";
import { API } from "@editorjs/editorjs";
import { INoteData } from "@/hooks/useRichText";

const ReactEditorJS = createReactEditorJS();

export default function MarkDownEditor({
    note,
    updateNote,
    activeNote,
    changeActiveNote,
}: PropsWithChildren<{
    note: INoteData;
    activeNote: number | undefined | null;
    changeActiveNote: (activeNoteId: number) => void;
    updateNote: ({
        api,
        title,
    }: {
        api?: API | undefined;
        title?: string | undefined;
    }) => Promise<void>;
}>) {
    return (
        <>
            <div className="codex-editor px-24 bg-inherit">
                <input
                    value={note.title}
                    name="note-title"
                    onChange={(e) => updateNote({ title: e.target.value })}
                    className="mt-12 bg-inherit ring-0 focus:outline-none text-white text-5xl font-extrabold tracking-widest bg-[rgb(31,41,55)] p-3 rounded-md"
                />
            </div>
            <ReactEditorJS
                onChange={(api) => updateNote({ api: api })}
                // @ts-ignore
                tools={EDITOR_JS_TOOLS}
                defaultValue={note.note}
            />
        </>
    );
}
