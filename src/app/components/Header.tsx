import Image from "next/image";

export default function Header() {
    return (
        <header className="px-40 pt-6 flex items-center justify-between">
            <div className="flex items-center gap-5">
                <h1>Username</h1>
                <div 
                    className="text-white p-6 bg-cover bg-no-repeat"
                    style={{backgroundImage: "url('/images/losange.png')"}}>
                    <p>LV.<em>5</em></p>
                </div>
            </div>
            <div className="flex items-center gap-20">
                <div className="flex items-center gap-5">
                    <Image
                        src="/images/pokeball.png"
                        alt="Poke Coins icons"
                        width={50}
                        height={50}
                    />
                    10
                </div>
                <Image
                    src="/images/settings-icon.png"
                    alt="Settings icon"
                    width={50}
                    height={50}
                />
            </div>
        </header>
    )
}