import { Head } from "@inertiajs/react";
import { INote, INotification, PageProps } from "@/types";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/Components/ui/resizable";
import UserAvatar from "@/Components/UserAvatar";
import PrimaryButton from "@/Components/PrimaryButton";
import { Plus, SaveAll } from "lucide-react";
import MarkDownEditor from "@/Components/Markdown";
import useRichText from "@/hooks/useRichText";
import ListNote from "@/Components/ListNotes";
import Notification from "@/Components/Notification";
import { MouseEvent, useState } from "react";
import { router } from "@inertiajs/react";
import { Separator } from "@/Components/ui/separator";
import { useSelectNote } from "@/hooks/useSelectNote";

export default function Dashboard({
    auth,
    notes,
    active_note,
    notification,
}: PageProps<{
    notes: INote[];
    active_note: number | null;
    notification: INotification;
}>) {
    const { user } = auth;
    const { activeNoteId, changeActiveNote } = useSelectNote(
        active_note as number | null,
        notes
    );
    const { note, updateNote, editorRef } = useRichText(activeNoteId, notes);
    const [openNotification, setOpenNotification] = useState(false);
    const handleNotificationClose = () => setOpenNotification(false);

    const saveNote = (noteId: number | null = null) => {
        if (!editorRef) {
            return;
        }

        if (!editorRef.current) {
            return;
        }

        return async (e: MouseEvent<HTMLElement>) => {
            const data = await (editorRef.current as any).save();

            e.preventDefault();
            console.log("note", noteId);
            const uri =
                noteId === null
                    ? "http://localhost:8000/dashboard"
                    : `http://localhost:8000/dashboard/${noteId}/`;

            const method = noteId === null ? "post" : "patch";

            router.visit(uri, {
                method: method,
                data: {
                    // @ts-ignore
                    note: data,
                    title: note.title,
                },
                replace: true,
                preserveState: true,
                only: ["message", "notes", "notification"],
                onError: (errors) => setOpenNotification(true),
                onSuccess: (event) => setOpenNotification(true),
            });
        };
    };

    return (
        <>
            <Head title="Dashboard" />
            <ResizablePanelGroup
                className="min-h-screen bg-gray-100 dark:bg-gray-900"
                direction="horizontal"
            >
                <ResizablePanel
                    defaultSize={17}
                    minSize={17}
                    maxSize={20}
                    className="dark:bg-gray-800"
                >
                    <UserAvatar user={user} />
                    <div className="w-full dark:bg-gray-700 h-[1px]" />
                    <div className="flex flex-col justify-center px-11 mt-8 gap-y-8">
                        <PrimaryButton
                            onClick={() => changeActiveNote(null)}
                            className="px-2 flex gap-x-3"
                        >
                            <Plus />
                            New Note
                        </PrimaryButton>
                    </div>
                    <Separator className="mt-6" />
                    <div className="flex flex-col justify-center px-11 mt-8 gap-y-8">
                        <ListNote
                            notes={notes as unknown[]}
                            active_note={activeNoteId}
                            changeActiveNote={changeActiveNote}
                        />
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel>
                    <MarkDownEditor
                        // activeNote={activeNoteId}
                        // changeActiveNote={changeActiveNote}
                        note={note}
                        updateNote={updateNote}
                        ref={editorRef}
                    />
                    <div className="px-12 flex">
                        <PrimaryButton
                            className="ml-auto px-2 flex gap-x-3"
                            onClick={saveNote(activeNoteId)}
                        >
                            <SaveAll />
                            {activeNoteId ? "Edit" : "Save"}
                        </PrimaryButton>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
            <Notification
                open={openNotification}
                onClose={handleNotificationClose}
                msg={notification.message}
                type={notification.type}
            />
        </>
    );
}
