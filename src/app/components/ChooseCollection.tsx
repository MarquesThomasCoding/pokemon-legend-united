import Link from "next/link";

export default function ChooseCollection() {
    return (
        <>
            <div className="fixed w-96 h-48 left-1/2 -bottom-24 hover:bottom-0 transform -translate-x-1/2 flex justify-center items-center transition-all duration-200">
                <Link href="/collection" className="border-8 border-r-4 border-black flex items-end justify-center p-2 rounded-ss-full w-1/2 h-full bg-red-500 hover:shadow-[8px_8px_0px_#020617] hover:transform hover:-translate-x-2 hover:-translate-y-2 transition-all duration-200">
                    <p className="text-2xl font-impact">Your collection</p>
                </Link>
                <Link href="/collection/all" className="border-8 border-l-4 border-black flex items-end justify-center p-2 rounded-se-full w-1/2 h-full bg-red-500 hover:shadow-[-8px_8px_0px_#020617] hover:transform hover:translate-x-2 hover:-translate-y-2 transition-all duration-200">
                    <p className="text-2xl font-impact">All collection</p>
                </Link>
            </div>
        </>
    )
}