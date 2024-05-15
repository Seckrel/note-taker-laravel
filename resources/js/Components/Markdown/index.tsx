import "./style.local.css";
import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./constant";
import { PropsWithChildren, useRef, useCallback, forwardRef } from "react";
import { API } from "@editorjs/editorjs";
import { INote } from "../../types/index";

const ReactEditorJS = createReactEditorJS();

interface IProps {
    note: INote;
    updateNote: ({
        api,
        title,
    }: {
        api?: API | undefined;
        title?: string | undefined;
    }) => Promise<void>;
}

const MarkDownEditor = forwardRef(
    ({ note, updateNote }: PropsWithChildren<IProps>, editorCore) => {
        const handleInitialize = useCallback(
            (instance: any) => {
                if (!editorCore) return;
                (editorCore as any).current = instance;
            },
            [editorCore]
        );

        // const handleChange = async (api) => {
        //     try {
        //         if (editorCore && editorCore.current) {
        //             console.log("here", editorCore);
        //             const savedData = editorCore.current.save();

        //             updateNote({ api: api });
        //         } else {
        //             console.log("failed");
        //         }
        //     } catch (e) {
        //         console.log(e);
        //     }
        // };

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
                    ref={editorCore}
                    onInitialize={handleInitialize}
                    holder={`holder-${note.id}`}
                    // onChange={handleChange}
                    // @ts-ignore
                    tools={EDITOR_JS_TOOLS}
                    value={note.note}
                >
                    <div id={`holder-${note.id}`} />
                </ReactEditorJS>
            </>
        );
    }
);

export default MarkDownEditor;
