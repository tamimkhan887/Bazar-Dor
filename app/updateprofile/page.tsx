"use client"
import { toast } from "react-toastify";
import { authClient } from "../lib/auth-client";
import { useRouter } from "next/navigation";
import { Form, TextField, Button, Label, Input } from "@heroui/react";

const Page = () => {
    const { data: session, isPending } = authClient.useSession();
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
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const name = formData.get("name")?.toString().trim();
        if (!name) {
            toast.error("Please enter your name");
            return;
        }
        const { error } = await authClient.updateUser({
            name,
        });
        if (error) {
            toast.error(error.message);
            return;
        }
        form.reset();
        toast.success("Name updated successfully!");
    };
    return (
        <div className="my-20 max-w-5xl mx-auto">
            <div>
                <h3 className="text-black font-bold text-2xl">আমার প্রোফাইল</h3>
                <p className="text-sm text-gray-600">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
            </div>
            <div className="bg-gray-100 p-6 mt-6 flex justify-between items-center rounded-xl">
                <div>
                    <h3>Name: <span className="text-green-700">{session?.user.name}</span></h3>
                    <h3>Email: <span className="text-green-700">{session?.user.email}</span></h3>
                </div>
                <div>
                    <button
                        className="text-red-700 border border-red-700 px-4 py-2 rounded-lg"
                        onClick={handleSignOut}
                    >
                        ↩ সাইন আউট
                    </button>
                </div>
            </div>
            <div className="bg-gray-100 mt-8 p-8 rounded-lg">
                <h3 className="text-lg font-semibold mb-5">তথ্য</h3>
                <Form onSubmit={onSubmit} className="flex flex-col gap-4 pl-5">
                    <TextField isRequired>
                        <Label className="ml-3">নাম</Label>
                        <Input className="border border-gray-100 w-full"
                            type="text"
                            name="name"
                            placeholder="নাম আপডেট "
                        />
                    </TextField>
                    <Button className="bg-green-700 w-full" type="submit">
                        আপডেট
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default Page;