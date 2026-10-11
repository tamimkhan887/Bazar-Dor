"use client";

import { useState } from "react";
import Image from "next/image";
import down from "@/public/down.png";
import up from "@/public/up.png";
import type { ProductsType } from "@/app/Type/Products";
import Link from "next/link";

type SortOrder = "default" | "high-to-low" | "low-to-high";

type CategoryProductsProps = {
    products: ProductsType[];
};

const CategoryProducts = ({ products }: CategoryProductsProps) => {
    const [sortOrder, setSortOrder] = useState<SortOrder>("default");

    const handleSortChange = (value: string) => {
        if (value === "default" || value === "high-to-low" || value === "low-to-high") {
            setSortOrder(value);
        }
    };

    const sortedProducts = [...products];
    if (sortOrder === "high-to-low") {
        sortedProducts.sort((a, b) => b.today - a.today);
    } else if (sortOrder === "low-to-high") {
        sortedProducts.sort((a, b) => a.today - b.today);
    }

    return (
        <>
            <div className="bg-gray-100 px-6 py-4 rounded-xl my-6 flex items-center justify-end gap-2">
                <label htmlFor="category-sort" className="text-sm font-medium text-gray-600">
                    Sort by:
                </label>
                <select
                    id="category-sort"
                    value={sortOrder}
                    onChange={(event) => handleSortChange(event.target.value)}
                    className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                >
                    <option value="default">Default</option>
                    <option value="high-to-low">Price: High to Low</option>
                    <option value="low-to-high">Price: Low to High</option>
                </select>
            </div>

            {sortedProducts.length === 0 ? (
                <p className="py-8 text-center text-sm text-gray-500">এই বিভাগে কোনো পণ্য পাওয়া যায়নি।</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {sortedProducts.map((product) => {
                        const isUp = product.change.dir === "up";

                        return (
                            <Link href={`/products/${product.id}`}  key={product.id}>
                                <div
                                    className="bg-gray-100 border border-gray-100 shadow-sm rounded-2xl p-5 flex flex-col justify-between"
                                   
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl shrink-0 border border-gray-100">
                                            {product.image}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800 text-lg">{product.nameBn}</h4>
                                            <p className="text-sm text-gray-500">
                                                {product.unit === "kg" ? "প্রতি কেজি" : product.unit}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-end justify-between">
                                        <div>
                                            <p className="text-xs text-gray-400 mb-1">আজকের দাম</p>
                                            <p className="text-xl font-bold text-gray-900">
                                                {product.today} <span className="text-sm font-normal text-gray-600">টাকা</span>
                                            </p>
                                        </div>

                                        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${isUp ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
                                            }`}>
                                            <Image
                                                width={10}
                                                height={10}
                                                src={isUp ? up : down}
                                                alt={isUp ? "increase" : "decrease"}
                                            />
                                            <span>{product.change.pct}%</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default CategoryProducts;
