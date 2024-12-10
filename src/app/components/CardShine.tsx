import Image from "next/image";

export const CardShine = ({ name, imageSrc, show }: { name: string, imageSrc: string, show: boolean }) => {
    return (
        <div className={(show?"grayscale-0":"grayscale") + " relative flex flex-col p-4 w-52 h-80 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 overflow-hidden"}>
            <Image className="absolute top-0 left-0 self-center max-w-none h-full drop-shadow-[4px_4px_4px_#111]" src={imageSrc} alt="Pokemon" width={320} height={320} />
            <p className="font-semibold">{name}</p>
            <div className="bg-[linear-gradient(90deg,transparent_25%,rgba(255,255,255,.2)_50%,transparent_75%,transparent_100%)] absolute top-0 left-0 z-10 w-full h-full overflow-hidden rounded-lg bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat transition-[background-position_0s_ease] hover:bg-[position:200%_0,0_0] hover:duration-[3000ms]"></div>
        </div>
    );
};
  