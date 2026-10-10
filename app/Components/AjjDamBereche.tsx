import up from "@/public/up.png";
import Image from "next/image";
import { ProductsType } from "../Type/Products";

const AjjDamBereche = async () => {
    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
    const data: ProductsType[] = await res.json();
    const filterDam = data.filter(d => d.change.dir === "up");
    const sortedData = filterDam.sort((a, b) => b.change.pct - a.change.pct);

    return (
        <div className="mt-10">
            <div className="flex gap-2 items-center mb-4">
                <Image width={16} height={16} src={up} alt="up icon" />
                <h3 className="text-xl font-bold text-gray-800">আজ দাম বেড়েছে</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedData.slice(0, 6).map((sd) => (
                    <div 
                        className="bg-gray-100 border border-gray-100 rounded-2xl p-5 flex flex-col justify-between" 
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
                                <p className="text-xl font-bold text-gray-900">{sd.today} <span className="text-sm font-normal text-gray-600">টাকা</span></p>
                            </div>
                            
                            <div className="flex items-center gap-1 bg-red-50 text-red-600 px-2.5 py-1 rounded-full text-xs font-semibold">
                                <Image width={10} height={10} src={up} alt="increase" />
                                <span>{sd.change.pct}%</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AjjDamBereche;