"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "../lib/auth-client";
import { Button, Dropdown, Header, Label } from "@heroui/react";
import { toast } from "react-toastify";

const UserInfo = () => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    const router = useRouter();

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/signin");
                    router.refresh();
                    toast.success("SignOut Successful")
                },
            },
        });
    };

    if (isPending) {
        return <div className="h-10 w-20 animate-pulse rounded-lg bg-gray-200" />;
    }

    return (
        <div>
            {user ? (
                <Dropdown>
                    <Button  aria-label="User menu" variant="secondary">
                        <p className="text-xs md:text-normal">{user.name || "আমার অ্যাকাউন্ট"}</p>
                    </Button>

                    <Dropdown.Popover className="min-w-[256px]">
                        <Dropdown.Menu>
                            <Dropdown.Section>
                                <Header className="ml-3">{user.name || "আমার অ্যাকাউন্ট"}</Header>

                                <Dropdown.Item
                                    id="profile"
                                    textValue="আমার প্রোফাইল"
                                    onAction={() => router.push("/updateprofile")}
                                    className="cursor-pointer"
                                >
                                    <Label className="text-green-700 ml-3">👤 <span className="mr-1">আমার প্রোফাইল</span></Label>
                                </Dropdown.Item>

                                <Dropdown.Item
                                    id="signout"
                                    textValue="সাইন আউট"
                                    onAction={handleSignOut}
                                    className="cursor-pointer"
                                >
                                    <Label className="text-red-700 ml-3">↩ <span className="ml-1">সাইন আউট</span> </Label>
                                </Dropdown.Item>
                            </Dropdown.Section>
                        </Dropdown.Menu>
                    </Dropdown.Popover>
                </Dropdown>
            ) : (
                <div className="flex items-center gap-2 md:gap-8">
                    <Link
                        href="/signin"
                        className="text-xs font-semibold text-nowrap md:text-sm"
                    >
                        সাইন ইন
                    </Link>

                    <Link
                        href="/signup"
                        className="rounded-lg bg-green-700 px-2 py-3 text-xs font-semibold text-white text-nowrap md:px-4 md:text-sm"
                    >
                        সাইন আপ
                    </Link>
                </div>
            )}
        </div>
    );
};

export default UserInfo;