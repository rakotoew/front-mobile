import Link from "next/link";

export default function HomeButton(){
    return (
        <>
            <Link href="/">
                <p className="absolute top-5 left-5 text-blue-400 border border-blue-900 rounded-xl bg-black p-2 hover:transfrom hover:translate-x-0.5 hover:-translate-y-0.5 duration-500">Home</p>
            </Link>
        </>);
}