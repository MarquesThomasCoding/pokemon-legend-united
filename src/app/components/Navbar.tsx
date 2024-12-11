import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return(
        <div className='w-[700px] right-[-100px] flex flex-col gap-20 absolute'>
          <div className='flex gap-10 items-center rounded-full px-24 py-6 border-2 font-impact text-5xl bg-slate-500 rotate-[-8.5deg]'>
            <Link href="/shop" className='flex gap-10 items-center'>
              <Image 
                src="/images/pokeball.png" 
                alt="Pokeball icon"
                width={68}
                height={68} />
              Shop
            </Link>
          </div>
          <div className='flex gap-10 items-center rounded-full px-24 py-6 border-2 font-impact text-5xl bg-slate-500 rotate-[-8.5deg]'>
            <Link href="/collection" className='flex gap-10 items-center'>
              <Image 
                src="/images/pokeball.png" 
                alt="Pokeball icon"
                width={68}
                height={68} />
              Collection
            </Link>
          </div>
          <div className='flex gap-10 items-center rounded-full px-24 py-6 border-2 font-impact text-5xl bg-slate-500 rotate-[-8.5deg]'>
            <Link href="/card" className='flex gap-10 items-center'>
              <Image 
                src="/images/pokeball.png" 
                alt="Pokeball icon"
                width={68}
                height={68} />
              Card Editor
            </Link>
          </div>
        </div>
    )
}