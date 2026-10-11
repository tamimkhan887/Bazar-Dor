import Link from "next/link";

const NotFound = () => (
    <main className="flex min-h-[50vh] items-center justify-center px-4 py-12">
        <section className="w-full max-w-xl rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm sm:p-12">
            <p className="text-6xl font-bold text-green-700">৪০৪</p>
            <h1 className="mt-4 text-2xl font-bold text-gray-800">
                দুঃখিত, পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
            </h1>
            <p className="mt-2 text-sm text-gray-500">
                আপনি যে পৃষ্ঠাটি খুঁজছেন, সেটি নেই অথবা সরিয়ে ফেলা হয়েছে।
            </p>
            <Link
                href="/"
                className="mt-6 inline-flex rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-800"
            >
                হোম পেজে ফিরে যান
            </Link>
        </section>
    </main>
);

export default NotFound;
