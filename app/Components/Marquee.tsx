import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"
import up from "@/public/up.png"
import down from "@/public/down.png"
import Image from "next/image";
import Link from "next/link";
const Marquee = async () => {
    interface MarqueeProps {
        categoryIcon: string,
        id: number,
        nameBn: string,
        change: { dir: string, pct: number }
        today: number
    }
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products")
    const data: MarqueeProps[] = await res.json()
    const firstTenData = data.slice(0, 20)
    return (
        <MarqueeText duration={10}>
            <div className="flex  border-gray-100">
                {
                    firstTenData.map(text => <Link href={`/products/${text.id}`} key={text.id}>
                        <div className="flex gap-3 justify-center items-center border-x border-gray-200 px-6 py-3" >
                            <h3>{text.categoryIcon}</h3>
                            <p className="font-bold text-sm">{text.nameBn}</p>
                            <p className="text-sm">{text.today} টাকা/কেজি</p>
                            {text.change.dir === "up" ? <div className="flex justify-center items-center gap-2">
                                <div>
                                    <Image width={12} src={up} alt="up"></Image>
                                </div>
                                <p className="text-red-700 text-sm font-semibold">{text.change.pct}%</p>
                            </div> : <div className="flex justify-center items-center gap-2">
                                <div>
                                    <Image width={12} src={down} alt="down"></Image>
                                </div>
                                <p className="text-green-700 text-sm font-semibold">{text.change.pct}%</p>
                            </div>}
                        </div>
                    </Link>)
                }
            </div>
        </MarqueeText>
    );
};

export default Marquee;