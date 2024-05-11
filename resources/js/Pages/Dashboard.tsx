import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/Components/ui/resizable";
import UserAvatar from "@/Components/UserAvatar";
import PrimaryButton from "@/Components/PrimaryButton";
import { Plus } from "lucide-react";

export default function Dashboard({ auth }: PageProps) {
    const { user } = auth;
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
                    <div className="flex flex-col justify-center px-11 mt-8">
                        <PrimaryButton className="px-2 flex gap-x-3">
                            <Plus />
                            New Note
                        </PrimaryButton>
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel>Two</ResizablePanel>
            </ResizablePanelGroup>
        </>
    );
}
