import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
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
import axios, { AxiosError } from "axios";

export default function Dashboard({ auth, notes }: PageProps) {
    const { user } = auth;
    const { note, updateNote } = useRichText();
    const [response, setResponse] = useState<{
        message: string;
        status: number | undefined;
    }>({
        message: "",
        status: undefined,
    });
    const [openNotification, setOpenNotification] = useState(false);
    const handleNotificationClose = () => setOpenNotification(false);

    const saveNote = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        try {
            const { data, status, statusText } = await axios.post(
                "http://localhost:8000/dashboard",
                note
            );
            setResponse({
                message: data.message,
                status: status,
            });
            setOpenNotification(true);
            if (statusText === "OK") {
                notes += data.note;
            }
        } catch (err: unknown) {
            const errors = err as Error | AxiosError;
            if (!axios.isAxiosError(errors)) {
            } else {
                setResponse({
                    message: errors.response!.data.message,
                    status: errors.response!.status,
                });
            }

            setOpenNotification(true);
        }
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
                        <PrimaryButton className="px-2 flex gap-x-3">
                            <Plus />
                            New Note
                        </PrimaryButton>
                        <ListNote notes={notes} />
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel>
                    <MarkDownEditor note={note} updateNote={updateNote} />
                    <div className="px-12 flex">
                        <PrimaryButton
                            className="ml-auto px-2 flex gap-x-3"
                            onClick={saveNote}
                        >
                            <SaveAll />
                            Save
                        </PrimaryButton>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
            <Notification
                open={openNotification}
                onClose={handleNotificationClose}
                msg={response.message}
                status={response.status}
            />
        </>
    );
}
