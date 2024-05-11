import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import "./style.local.css";

export default function MarkDownEditor() {
    const editor = new EditorJS({
        holder: "note-editor",
        autofocus: true,
        tools: {
            header: Header,
            list: {
                class: List,
                inlineToolbar: true,
                config: {
                    defaultStyle: "unordered",
                },
            },
        },
    });

    return <div id="note-editor" className="mt-11"></div>;
}
