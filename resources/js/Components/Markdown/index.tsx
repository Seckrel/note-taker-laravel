import "./style.local.css";
import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./constant";
import { PropsWithChildren } from "react";
import { OutputData, API } from "@editorjs/editorjs";

const ReactEditorJS = createReactEditorJS();

export default function MarkDownEditor({
    note,
    updateNote,
}: PropsWithChildren<{
    note: OutputData;
    updateNote: (api: API) => Promise<void>;
}>) {
    // const { note, updateNote } = useRichText();
    return (
        <ReactEditorJS
            onChange={updateNote}
            // @ts-ignore
            tools={EDITOR_JS_TOOLS}
            defaultValue={note}
        />
    );
}
