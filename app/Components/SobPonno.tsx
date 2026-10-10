import down from "@/public/down.png";
import up from "@/public/up.png";
import Image from "next/image";
import { ProductsType } from "../Type/Products";

const SobPonno = async () => {
    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
    const data: ProductsType[] = await res.json();

    return (
        <div className="mt-12">
            <div>
                <h3 className="font-bold text-xl text-gray-800">সব পণ্য</h3>
                <p className="text-xs text-gray-500 mt-2">মোট {data.length} টি পণ্য দেখানো হচ্ছে</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {data.map((sd) => {
                    const isUp = sd.change.dir === "up";
                    return (
                        <div 
                            className="bg-gray-100 border border-gray-100 shadow-sm  rounded-2xl p-5 flex flex-col justify-between" 
                            key={sd.id}
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl shrink-0 border border-gray-100">
                                    {sd.image}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800 text-lg">{sd.nameBn}</h4>
                                    <p className="text-sm text-gray-500">
                                        {sd.unit === "kg" ? "প্রতি কেজি" : sd.unit}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-100 flex items-end justify-between">
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">আজকের দাম</p>
                                    <p className="text-xl font-bold text-gray-900">
                                        {sd.today} <span className="text-sm font-normal text-gray-600">টাকা</span>
                                    </p>
                                </div>
                                
                                <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                                    isUp ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
                                }`}>
                                    <Image 
                                        width={10} 
                                        height={10} 
                                        src={isUp ? up : down} 
                                        alt={isUp ? "increase" : "decrease"} 
                                    />
                                    <span>{sd.change.pct}%</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SobPonno;