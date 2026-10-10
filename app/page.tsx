import Image from "next/image";
import { Suspense } from "react";
import DateTime from "./Components/DateTime";
import banner from "@/public/bazar-hero.png"
import AjjDamBereche from "./Components/AjjDamBereche";
const Home = () => {
  return (
    <div>
      <div className="flex flex-col-reverse md:flex-row justify-between items-center bg-gray-100 mt-8 rounded-2xl gap-10 pb-8">
        <div className="space-y-6 px-8 ">
          <p className="inline-block px-4 py-1 font-medium text-sm bg-green-50 rounded-2xl text-green-700">
            <Suspense fallback={<span className="text-sm">...</span>}>
              <DateTime />
            </Suspense>
          </p>
          <h3 className="text-4xl font-bold">আজকের বাজারের দাম এক নজরে</h3>
          <p className="text-sm">চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন- <br />সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p>
          <button className="text-white font-semibold text-sm bg-green-700 px-5 py-3 rounded-lg">সব পণ্য দেখুন</button>
        </div>
        <div>
          <Image src={banner} alt="banner"></Image>
        </div>
      </div>
      <Suspense fallback={<p className="mt-10">লোড হচ্ছে...</p>}>
        <AjjDamBereche />
      </Suspense>
    </div>
  );
};

export default Home;