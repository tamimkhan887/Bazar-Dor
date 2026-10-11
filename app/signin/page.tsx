"use client"
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { authClient } from "../lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
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
    const handleGoogleSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
        console.log(data)
    }
    const handleGithubSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "github",
        });
        console.log(data)
    }
    return (
        <div>
            <div className="my-6">
                <h3 className="text-2xl font-bold text-center">সাইন ইন</h3>
                <p className="text-sm  text-gray-500 text-center">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>
            </div>
            <div className="w-full max-w-lg mx-auto bg-gray-100 p-6 rounded-2xl">
                <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
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
                    <button onClick={()=>handleGithubSignIn()}>
                        <div className="flex justify-center items-center gap-1 bg-white px-7 py-2 rounded-lg">
                            <FaGithub size={22} />
                            <h3 className="text-sm font-semibold">GitHub দিয়ে চালিয়ে যান</h3>
                        </div>
                    </button>
                </div>
                <p className="mt-4 text-center">অ্যাকাউন্ট নেই? <Link href="\signup" className="text-green-700 ">সাইন আপ করুন</Link> </p>
            </div>

            <Link href="/"><p className="text-center mt-6 text-gray-600 text-sm">← হোম পেজে ফিরে যান</p></Link>
        </div>

    );
};

export default SignInpage;