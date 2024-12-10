"use client"

import Image from "next/image";
import { useState } from "react";

export const CardShine = ({ name, imageSrc, show, gradient }: { name: string, imageSrc: string, show: boolean, gradient: string }) => {
    const [active, setActive] = useState(false);
    function handleClick(card: HTMLDivElement) {
        if(!active) card.classList.remove('grayscale');
        else card.classList.add('grayscale');
        setActive(!active);
    }
    return (
        <div className={(show?"flex":"hidden") + " grayscale relative flex-col p-4 w-52 h-80 rounded-xl bg-gradient-to-r " + gradient + " cursor-pointer shadow-md shadow-gray-500"} onClick={(e) => handleClick(e.currentTarget)}>
            <Image className="absolute bottom-3 self-center max-w-none w-auto h-4/5 drop-shadow-[4px_4px_4px_#111]" src={imageSrc} alt="Pokemon" width={320} height={320} />
            <p className="font-semibold">{name}</p>
            <div className="bg-[linear-gradient(90deg,transparent_25%,rgba(255,255,255,.2)_50%,transparent_75%,transparent_100%)] absolute top-0 left-0 z-10 w-full h-full overflow-hidden rounded-lg bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat transition-[background-position_0s_ease] hover:bg-[position:200%_0,0_0] hover:duration-[2000ms]"></div>
        </div>
    );
};