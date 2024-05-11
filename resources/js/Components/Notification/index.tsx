"use client";

import { CircleCheck, X } from "lucide-react";
import { createPortal } from "react-dom";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import "./style.local.css";
import useToggleTimeout from "@/hooks/useToggleTimeout";

export default function Notification({
    msg,
    status,
}: {
    msg: string;
    status: number | undefined;
}) {
    if (!status) {
        return null;
    }
    const toggleNotification = useToggleTimeout();
    const positiveStatus = useMemo(() => status >= 200 && status < 300, []);
    const NotificationMsg = () => (
        <div
            style={{
                background: positiveStatus ? "green" : "red",
            }}
            className={cn(
                "flex gap-x-5 p-5 absolute  top-right z-50 max-h-32 max-w-80 w-80 rounded-md"
            )}
        >
            {positiveStatus ? (
                <CircleCheck size={55} />
            ) : (
                <X size={55} color="red" />
            )}
            <span className="text-white text-2xl  block overflow-wrap--anywhere">
                {msg}
            </span>
        </div>
    );
    return (
        <>
            {toggleNotification &&
                createPortal(<NotificationMsg />, document.body)}
        </>
    );
}
