import { UserButton } from "@clerk/nextjs";
import Image from 'next/image'

export default function Home() {
  return (
    <header className="fixed top-0 left- py-4 w-[100%]">
      <div className="container flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <span>
            <Image
              src="/images.png"
              width={35}
              height={35}
              alt="Picture of the author"
            />
          </span>
          <span>
            <p className="text-3xl sm:block hidden font-extrabold text-white">Reddit</p>
          </span>
        </div>
        <div className="flex justify-center gap-3">
          <div className="h-[33px] hover:bg-[#33464C] w-[33px]  rounded-full flex justify-center items-center">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </header>
  )
}


