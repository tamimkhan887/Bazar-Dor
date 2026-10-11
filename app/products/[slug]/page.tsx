import { Spinner } from "@heroui/react";
import { Suspense } from "react";
import { notFound } from "next/navigation";

type Market = {
    market: string;
    division: string;
    min: number;
    max: number;
};

type Product = {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: {
        dir: "up" | "down";
        pct: number;
    };
    markets: Market[];
};

type ProductPageProps = {
    params: Promise<{ slug: string }>;
};

const formatPrice = (price: number) =>
    new Intl.NumberFormat("bn-BD").format(price);

const formatChange = (value: number) =>
    new Intl.NumberFormat("bn-BD", {
        maximumFractionDigits: 1,
    }).format(value);

const ProductLoadError = () => (
    <main className="mx-auto mt-10 max-w-5xl px-4">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
            <h1 className="text-xl font-bold text-red-700">
                পণ্যের তথ্য লোড করা যায়নি
            </h1>
            <p className="mt-2 text-sm text-gray-600">
                পরে আবার চেষ্টা করুন।
            </p>
        </div>
    </main>
);

const PriceCard = ({
    title,
    price,
    description,
    color,
}: {
    title: string;
    price: number;
    description: string;
    color: string;
}) => (
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <p className="text-sm text-gray-500">{title}</p>

        <p className={`mt-2 text-2xl font-bold ${color}`}>
            ৳{formatPrice(price)}
            <span className="ml-1 text-xs font-normal text-gray-500">
                /কেজি
            </span>
        </p>

        <p className="mt-1 text-xs text-gray-500">{description}</p>
    </div>
);

const ProductContent = async ({ params }: ProductPageProps) => {
    const { slug } = await params;

    let res: Response;

    try {
        res = await fetch(
            `https://openapi.programming-hero.com/api/bazardor/products/${slug}`,
            {
                next: {
                    revalidate: 300,
                },
            }
        );

    } catch (error) {
        console.error("Product fetch error:", error);
        return <ProductLoadError />;
    }

    if (res.status === 404) {
        notFound();
    }

    if (!res.ok) {
        console.error("Product fetch error: HTTP", res.status);
        return <ProductLoadError />;
    }

    let result: unknown;
    try {
        result = await res.json();
    } catch (error) {
        console.error("Product response error:", error);
        return <ProductLoadError />;
    }

    // Supports both { data: product } and direct product responses.
    let productData =
        result && typeof result === "object" && "data" in result
            ? result.data
            : result;

    // Also supports { data: { product: product } }.
    if (
        productData &&
        typeof productData === "object" &&
        "product" in productData
    ) {
        productData = productData.product;
    }

    if (
        !productData ||
        typeof productData !== "object" ||
        !("nameBn" in productData) ||
        typeof productData.nameBn !== "string"
    ) {
        notFound();
    }

    const product = productData as Product;
    const isUp = product.change?.dir === "up";

    return (
        <main className="min-h-screen px-3 py-5 sm:px-6 sm:py-8">
            <div className="mx-auto max-w-5xl space-y-4">
                <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-3">
                            <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-3xl">
                                {product.image || product.categoryIcon}
                            </div>

                            <div className="min-w-0">
                                <p className="mb-1 text-xs text-gray-500">
                                    {product.categoryNameBn}
                                </p>

                                <h1 className="text-xl font-bold text-gray-800 sm:text-2xl">
                                    {product.nameBn}
                                </h1>

                                <p className="mt-1 text-xs text-gray-500">
                                    বাজারদর • প্রতি কেজি
                                </p>
                            </div>
                        </div>

                        <div className="shrink-0 rounded-xl bg-gray-50 px-3 py-2 text-right">
                            <p className="text-xs text-gray-500">
                                আজকের দাম
                            </p>

                            <p className="mt-1 text-2xl font-bold text-gray-800">
                                ৳{formatPrice(product.today)}
                            </p>

                            <p
                                className={`mt-1 text-xs font-semibold ${
                                    isUp
                                        ? "text-red-600"
                                        : "text-green-600"
                                }`}
                            >
                                {isUp ? "▲" : "▼"}{" "}
                                {formatChange(product.change?.pct ?? 0)}%
                            </p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="mb-3 text-sm font-bold text-gray-800">
                        বাজারদরের তুলনা
                    </h2>

                    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                        <PriceCard
                            title="আজকের দাম"
                            price={product.today}
                            description="বর্তমান বাজারদর"
                            color="text-green-600"
                        />

                        <PriceCard
                            title="গতকালের দাম"
                            price={product.yesterday}
                            description={`${
                                product.today > product.yesterday
                                    ? "দাম বেড়েছে"
                                    : product.today < product.yesterday
                                      ? "দাম কমেছে"
                                      : "দাম অপরিবর্তিত"
                            }`}
                            color="text-gray-800"
                        />

                        <PriceCard
                            title="গত সপ্তাহের দাম"
                            price={product.lastWeek}
                            description="৭ দিন আগের দাম"
                            color="text-gray-800"
                        />

                        <PriceCard
                            title="গত মাসের দাম"
                            price={product.lastMonth}
                            description="৩০ দিন আগের দাম"
                            color="text-gray-800"
                        />
                    </div>
                </section>

                <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4 sm:px-6">
                        <div>
                            <h2 className="text-base font-bold text-gray-800">
                                বাজারভিত্তিক মূল্য তালিকা
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                বিভিন্ন বাজারে {product.nameBn}-এর দাম
                            </p>
                        </div>

                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                            {formatPrice(product.markets?.length ?? 0)} বাজার
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-135 text-left text-sm">
                            <thead className="bg-gray-50 text-xs text-gray-600">
                                <tr>
                                    <th className="px-4 py-3 font-semibold sm:px-6">
                                        বাজারের নাম
                                    </th>

                                    <th className="px-4 py-3 font-semibold">
                                        বিভাগ
                                    </th>

                                    <th className="px-4 py-3 text-right font-semibold">
                                        সর্বনিম্ন দাম
                                    </th>

                                    <th className="px-4 py-3 text-right font-semibold sm:px-6">
                                        সর্বোচ্চ দাম
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {product.markets?.map((market, index) => (
                                    <tr
                                        key={`${market.market}-${index}`}
                                        className="transition-colors hover:bg-green-50/60"
                                    >
                                        <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-800 sm:px-6">
                                            {market.market}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                                            {market.division}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3 text-right font-medium text-green-700">
                                            ৳{formatPrice(market.min)}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3 text-right font-medium text-red-600 sm:px-6">
                                            ৳{formatPrice(market.max)}
                                        </td>
                                    </tr>
                                ))}

                                {!product.markets?.length && (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="px-4 py-10 text-center text-gray-500"
                                        >
                                            কোনো বাজারের তথ্য পাওয়া যায়নি।
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="border-t border-gray-100 bg-gray-50 px-4 py-3 text-xs text-gray-500 sm:px-6">
                        মূল্য বাংলাদেশি টাকা (৳) অনুযায়ী দেখানো হয়েছে।
                    </div>
                </section>
            </div>
        </main>
    );
};

const ProductPage = ({ params }: ProductPageProps) => (
    <Suspense
        fallback={
            <div className="flex min-h-[50vh] items-center justify-center">
                <Spinner size="lg" />
            </div>
        }
    >
        <ProductContent params={params} />
    </Suspense>
);

export default ProductPage;