"use client";

import { CircleCheck, X } from "lucide-react";
import { createPortal } from "react-dom";
import { useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";
import "./style.local.css";
import useToggleTimeout from "@/hooks/useToggleTimeout";

export default function Notification({
    msg,
    type,
    open,
    onClose,
}: {
    msg: string;
    type: string;
    open: boolean;
    onClose: () => void;
}) {
    if (!(status || open)) {
        onClose();
        return null;
    }

    const toggleNotification = useToggleTimeout(open);
    const positiveStatus = useMemo(() => type === "success", []);
    useEffect(() => {
        if (!toggleNotification) {
            onClose();
        }
    }, [toggleNotification]);
    const NotificationMsg = () => (
        <div
            style={{
                background: positiveStatus ? "green" : "red",
            }}
            className={cn(
                "flex gap-x-5 p-5 absolute top-right z-50 min-h-32 max-w-80 w-80 rounded-md"
            )}
        >
            {positiveStatus ? (
                <CircleCheck size={55} />
            ) : (
                <X size={55} color="white" />
            )}
            <span className="text-white text-lg  block overflow-wrap--anywhere">
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
