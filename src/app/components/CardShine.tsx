"use client"

import Image from "next/image";

export const CardShine = ({ name, imageSrc, show, gradient }: { name: string, imageSrc: string, show: boolean, gradient: string }) => {
    
    return (
        <div className={(show?"flex":"hidden") + " relative flex-col w-52 h-80 rounded-xl bg-gradient-to-r " + gradient + " cursor-pointer shadow-md shadow-gray-500"}>
            <p className="font-semibold m-4">{name}</p>
            <div className="overflow-hidden rounded-xl absolute w-full h-full after:absolute after:top-0 after:translate-x-full hover:after:-translate-x-full after:transition-all after:duration-1000 after:w-full after:h-full after:bg-gradient-to-r after:from-transparent after:via-white after:to-transparent after:opacity-40"></div>
            <Image className="absolute bottom-3 self-center max-w-none w-auto h-4/5 drop-shadow-[4px_4px_4px_#111] pointer-events-none" src={imageSrc} alt="Pokemon" width={320} height={320} />
        </div>
    );
};