import Image from "next/image";
import { Suspense } from "react";
import logo from "@/public/logo-icon.png"
import DateTime from "./DateTime";
import Link from "next/link";
import UserInfo from "./UserInfo";
const Navbar = () => {
    return (
        <div>
            <div className="container mx-auto px-3 md:px-6 lg:px-12 mt-5">
                <div className="flex justify-between items-center">
                    <Link href="\">
                        <div className="flex  items-center gap-3">
                            <div className="bg-green-700 p-4 md:p-5 rounded-xl">
                                <Image src={logo} alt="Bazar-Logo"></Image>
                            </div>
                            <div>
                                <h3 className="font-bold text-xs md:text-2xl text-black">বাজার দর</h3>
                                <Suspense fallback={<p>...</p>}>
                                    <p className="text-xs"><DateTime></DateTime></p>
                                </Suspense>
                            </div>
                        </div>
                    </Link>
                    <UserInfo></UserInfo>
                </div>
            </div>
            <hr className="border border-gray-100 my-4" />
        </div>
    );
};

export default Navbar;