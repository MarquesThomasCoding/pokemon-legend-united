import Image from 'next/image';

export default function Loader() {
    return (
        <div className="m-auto flex flex-col items-center justify-center">
            <Image src="/images/pokeball.png" alt="" width={200} height={200} className="animate-spin" />
            <p className="text-black">Loading...</p>
        </div>
    )
}