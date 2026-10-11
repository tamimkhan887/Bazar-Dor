"use client"
const ScrollHandle = () => {
    const handleScroll = () => {
        document.getElementById("showproducts")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <a onClick={handleScroll} href="#showproducts" className="text-white font-semibold text-sm bg-green-700 px-5 py-3 rounded-lg">সব পণ্য দেখুন</a>
    );
};

export default ScrollHandle;