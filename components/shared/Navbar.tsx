import { UserButton, auth } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link";

const Navbar = () => {
  const { userId } = auth();

  return (
    <header className="bg-[#0B1416] py-2 w-[100%]">
      <div className="container flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <span>
            <Image
              src="/images.png"
              width={25}
              height={25}
              alt="Picture of the author"
            />
          </span>
          <span>
            <p className="text-2xl sm:block hidden font-extrabold
             text-white">Reddit</p>
          </span>
        </div>
        <div>
          search
        </div>
        <div className="flex justify-center gap-3">
          {userId && <>
            <div  className="h-[33px] hover:bg-[#33464C] w-[33px] 
              rounded-full flex justify-center items-center cursor-pointer">
                <i className="fa-regular text-2xl text-white font-bold  fa-plus"></i>
            </div>
            <div  className="h-[33px] hover:bg-[#33464C] w-[33px] 
              rounded-full flex justify-center items-center cursor-pointer">
                <i className="fa-regular text-2xl text-white font-bold  fa-bell"></i>
            </div>
            <div className="h-[33px] hover:bg-[#33464C] w-[33px] 
              rounded-full flex justify-center items-center">
              <UserButton afterSignOutUrl="/" />
            </div>
            </>
            }

          {
            !userId && <>
              <Link href="/sign-in" className="text-white bg-[#FF4500] px-4 py-2 rounded-full font-medium">
                Sign In
              </Link>
            </>
          }
        </div>
      </div>
    </header>
  )
}

export default Navbar