"use client";

import { useState } from "react";
import {
    Button,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { authClient } from "../lib/auth-client";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

const Page = () => {
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const passwordValue = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (passwordValue !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        setIsLoading(true);

        try {
            const { data, error } = await authClient.signUp.email({
                name,
                email,
                password: passwordValue,
            });

            if (error) {
                toast.error(error.message)
                return;
            }

            if (data) {
                form.reset();
                toast.success("Login Successful")
                setPassword("");
                router.push("/");
            }
        } catch (error) {

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({
            provider: "google",
        });
    }
    const handleGithubSignIn = async () => {
        await authClient.signIn.social({
            provider: "github"
        })
    }

    return (
        <div className="mt-10">
            <div className="mb-10">
                <h3 className="text-2xl font-bold text-center">
                    অ্যাকাউন্ট তৈরি করুন
                </h3>
                <p className="text-sm text-center text-gray-500">
                    বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                </p>
            </div>

            <div className="w-full max-w-lg mx-auto bg-gray-100 p-6 rounded-2xl">
                <Form
                    className="flex flex-col gap-4"
                    onSubmit={onSubmit}
                >
                    <TextField
                        className="flex flex-col"
                        isRequired
                        name="name"
                        type="text"
                    >
                        <Label className="text-sm font-medium ml-2">নাম</Label>
                        <Input
                            name="name"
                            className="text-sm border border-gray-200 px-3 py-3 rounded-lg"
                            placeholder="যেমন: রহিম উদ্দিন"
                        />
                        <FieldError />
                    </TextField>

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
                        className="flex flex-col"
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
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FieldError />
                    </TextField>

                    <TextField
                        className="flex flex-col"
                        isRequired
                        name="confirmPassword"
                        type="password"
                        validate={(value) => {
                            if (value !== password) {
                                return "Passwords do not match";
                            }
                            return null;
                        }}
                    >
                        <Label className="text-sm font-medium ml-2">
                            পাসওয়ার্ড নিশ্চিত করুন
                        </Label>
                        <Input
                            name="confirmPassword"
                            className="text-sm border border-gray-200 px-3 py-3 rounded-lg"
                            placeholder="আবার লিখুন"
                        />
                        <FieldError />
                    </TextField>

                    <Button
                        className="text-sm font-semibold bg-green-700 text-white py-2 w-full rounded-xl"
                        type="submit"
                        isDisabled={isLoading}
                    >
                        {isLoading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
                    </Button>
                </Form>
                <div className="mt-4 flex justify-between gap-2 items-center">
                    <hr className="border border-green-500 w-full" />
                    <p className="text-xs text-green-700">অথবা</p>
                    <hr className="border border-green-500 w-full" />
                </div>
                <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-0 md:justify-between items-center mt-4">
                    <button onClick={() => handleGoogleSignIn()}>
                        <div className="flex justify-center items-center gap-1 bg-white px-7 py-2 rounded-lg">
                            <FcGoogle size={24} />
                            <h3 className="text-sm font-semibold">Google দিয়ে চালিয়ে যান</h3>
                        </div>
                    </button>
                    <button onClick={() => handleGithubSignIn()}>
                        <div className="flex justify-center items-center gap-1 bg-white px-7 py-2 rounded-lg">
                            <FaGithub size={22} />
                            <h3 className="text-sm font-semibold">GitHub দিয়ে চালিয়ে যান</h3>
                        </div>
                    </button>
                </div>
                <p className="mt-4 text-center">অ্যাকাউন্ট আছে ? <Link href="\signin" className="text-green-700 ">সাইন ইন করুন</Link> </p>
            </div>

            <Link href="/"><p className="text-center mt-6 text-gray-600 text-sm">← হোম পেজে ফিরে যান</p></Link>
        </div>
    );
};

export default Page;
