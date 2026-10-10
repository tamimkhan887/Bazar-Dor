import Image from "next/image";
import { Suspense } from "react";
import logo from "@/public/logo-icon.png"
import DateTime from "./DateTime";
import Link from "next/link";
const Navbar = () => {
    return (
        <div>
            <div className="container mx-auto px-8 mt-5">
                <div className="flex justify-between items-center">
                    <Link href="\">
                        <div className="flex  items-center gap-3">
                            <div className="bg-green-700 p-5 rounded-xl">
                                <Image src={logo} alt="Bazar-Logo"></Image>
                            </div>
                            <div>
                                <h3 className="font-bold text-2xl text-black">বাজার দর</h3>
                                <Suspense fallback={<p>...</p>}>
                                    <DateTime></DateTime>
                                </Suspense>
                            </div>
                        </div>
                    </Link>
                    <div className="flex gap-8 items-center">
                        <Link href="/signin">
                            <button className="text-sm font-semibold ">সাইন ইন</button>
                        </Link>
                        <Link href="/signup">
                            <button className="bg-green-700 text-sm rounded-lg text-white font-semibold px-4 py-3">সাইন আপ</button>
                        </Link>
                    </div>
                </div>
            </div>
            <hr className="border border-gray-100 my-4" />
        </div>
    );
};

export default Navbar;