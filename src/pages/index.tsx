import Link from "next/link";
import Image from "next/image";
export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-800">
            <p className="text-9xl text-blue-200">Save Humanity</p>
            <p className="text-2xl text-blue-400 p-3">Ceci est un site présentant l&apos;application Save Humanity, inspiré du jeu Reigns</p>
            <div className="flex flex-row items-center justify-center p-3">
                <a href="https:/www.github.com/rakotoew" className="border-2 border-blue-900 bg-gray-700 w-48 h-28 rounded-3xl p-8 m-6 justify-center items-center flex flex-col hover:transfrom hover:translate-x-1 hover:-translate-y-1 duration-500">
                    <Image src="/icons/github.png" alt="Github" width={50} height={50}/>
                    <p className="text-center text-blue-400">Author&apos;s Github</p>
                </a>
                <Link href="/Statistiques" className="border-2 border-blue-900 bg-gray-700 w-48 h-28 rounded-3xl p-8 m-6 justify-center items-center flex flex-col hover:transfrom hover:translate-x-1 hover:-translate-y-1 duration-500">
                    <Image src={"/icons/statistics.png"} alt="Statistics" width={50} height={50}/>
                    <p className="text-center text-blue-400">Statistiques</p>
                </Link>
            </div>
        </div>);
}