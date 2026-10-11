"use client"
import { authClient } from "../lib/auth-client";

const page = () => {
    const {data:session} = authClient.useSession();
    console.log(session)
    return (
        <div className="mt-20">
            <div>
                <h3>আমার প্রোফাইল</h3>
                <p>আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
            </div>
        </div>
    );
};

export default page;