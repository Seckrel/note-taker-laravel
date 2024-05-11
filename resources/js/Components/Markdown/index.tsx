import EditorJS from "@editorjs/editorjs";
import Header from "editorjs-header-with-anchor";
import NestedList from "@editorjs/nested-list";
import Quote from "@editorjs/quote";
import InlineCode from "@editorjs/inline-code";
import editorjsCodecup from "@calumk/editorjs-codecup";
import "./style.local.css";

export default function MarkDownEditor() {
    const editor = new EditorJS({
        holder: "note-editor",
        autofocus: true,
        tools: {
            header: {
                class: Header,
            },
            list: {
                class: NestedList,
                inlineToolbar: true,
                config: {
                    defaultStyle: "ordered",
                },
            },
            quote: {
                class: Quote,
                inlineToolbar: true,
                shortcut: "CMD+SHIFT+O",
            },
            code: editorjsCodecup,
            inlineCode: {
                class: InlineCode,
            },
        },
    });

    return <div id="note-editor" className="mt-11"></div>;
}
