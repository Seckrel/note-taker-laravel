import { Avatar, AvatarFallback } from "@/Components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Link } from "@inertiajs/react";
import { User } from "@/types";
import { PropsWithChildren } from "react";

export default function UserAvatar({
    user,
}: PropsWithChildren<{ user: User }>) {
    return (
        <div className="flex flex-row justify-center px-14 py-7 gap-x-3">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar className="h-12 w-12 dark:bg-gray-500">
                        <AvatarFallback className="dark:bg-gray-500 text-2xl text-white">
                            {user.name.slice(0, 2).toLocaleUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                        <Link href={route("profile.edit")}>Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex text-gray-50 flex-col justify-between">
                <div className="">{user.name}</div>
                <div className="">{user.email}</div>
            </div>
        </div>
    );
}
