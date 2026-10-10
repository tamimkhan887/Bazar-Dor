import Link from "next/link";
import { NavlinkTypes } from "../Type/NavlinksType";

const Navlinks = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories")
    const data: NavlinkTypes[] = await res.json()
    return (
        <div className="container mx-auto px-3 md:px-6 lg:px-12 pb-4">
            <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-8">
                {
                    data.map(n => <Link href={`/Categories/${n.slug}`} key={n.id}>
                        <div className="flex gap-1 items-center" >
                            <p>{n.icon}</p>
                            <h3 className="font-semibold text-xs">{n.nameBn}</h3>
                        </div></Link>)
                }
            </div>
        </div>
    );
};

export default Navlinks;