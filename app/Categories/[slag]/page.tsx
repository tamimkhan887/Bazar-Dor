import { ProductsType } from "@/app/Type/Products";
import { Suspense } from "react";
import CategoryProducts from "./CategoryProducts";
import { Spinner } from "@heroui/react";
type CategoryPageProps = {
    params: Promise<{ slag: string }>;
};


const CategoryContent = async ({ params }: CategoryPageProps) => {
    const { slag } = await params;

    const data = await fetch(`https://openapi.programming-hero.com/api/bazardor/products?category=${slag}`)
    const catagorieData: ProductsType[] = await data.json()
    return (
        <div>
            <div className="flex items-center bg-gray-100 mt-6 rounded-xl p-3">
                <div className="w-16 h-16 flex items-center justify-center text-4xl shrink-0">
                    {catagorieData[0]?.image ?? catagorieData[0]?.categoryIcon}
                </div>
                <div>
                    <h3 className="text-2xl font-bold">{catagorieData[0]?.categoryNameBn ?? slag}</h3>
                    <p className="text-xs">{catagorieData.length}টি পণ্যের আজকের দাম ও পরিবর্তন </p>
                </div>
            </div>

            <CategoryProducts products={catagorieData} />
        </div>
    );
};

const CategoryPage = ({ params }: CategoryPageProps) => (
    <Suspense fallback={<div className="flex justify-center py-8"><Spinner /></div>}>
        <CategoryContent params={params} />
    </Suspense>
);

export default CategoryPage;