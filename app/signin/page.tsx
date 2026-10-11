"use client"
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { authClient } from "../lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
const SignInpage = () => {
    const router = useRouter();
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const form = e.currentTarget;
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const { data, error } = await authClient.signIn.email({
            email,
            password,
            rememberMe: true,
        })
        if (data) {
            form.reset();
            toast.success("Login Successful")
            router.push("/");
        }
        if (error) {
            form.reset();
            toast.error(error.message)
            return;
        }
    };
    return (
        <div>
            <div className="my-6">
                <h3 className="text-2xl font-bold text-center">সাইন ইন</h3>
                <p className="text-sm  text-gray-500 text-center">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>
            </div>
            <Form className="flex flex-col gap-4 w-full max-w-lg mx-auto bg-gray-100 p-6 rounded-2xl" onSubmit={onSubmit}>
                <TextField
                    className="flex flex-col"
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                        ) {
                            return "Please enter a valid email address";
                        }
                        return null;
                    }}
                >
                    <Label className="text-sm font-medium ml-2">ইমেইল</Label>
                    <Input
                        name="email"
                        className="text-sm border border-gray-200 px-3 py-3 rounded-lg"
                        placeholder="you@example.com"
                    />
                    <FieldError />
                </TextField>
                <TextField
                    isRequired
                    minLength={8}
                    name="password"
                    type="password"
                    validate={(value) => {
                        if (value.length < 8) {
                            return "Password must be at least 8 characters";
                        }
                        if (!/[0-9]/.test(value)) {
                            return "Password must contain at least one number";
                        }
                        return null;
                    }}
                >
                    <Label className="text-sm font-medium ml-2">পাসওয়ার্ড</Label>
                    <Input
                        name="password"
                        className="text-sm border border-gray-200 px-3 py-3 rounded-lg"
                        placeholder="কমপক্ষে ৮ অক্ষর"
                    />
                    <FieldError />
                </TextField>
                <Button
                    className="text-sm font-semibold bg-green-700 text-white py-2 w-full rounded-xl"
                    type="submit"
                >
                    সাইন ইন
                </Button>
            </Form>
        </div>
    );
};

export default SignInpage;