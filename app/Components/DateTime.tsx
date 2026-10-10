import { connection } from "next/server";

const DateTime = async () => {
    await connection();

    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return <span className="text-sm">{date}</span>;
};

export default DateTime;