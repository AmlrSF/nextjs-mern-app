"use client"

import { sidebarLinks } from "@/utils/constants"
import { SignOutButton, SignedIn } from "@clerk/nextjs";
import { link } from "fs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
const LeftSiddBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="custom-scrollbar sticky left-0 top-0 z-20 
    flex h-[calc(100vh-47px)] w-[45px] sm:w-[250px]    overflow-auto
      bg-[#0B1416] border-r border-[#1A282D]">
      <div className="flex flex-col justify-between w-full gap-2 p-2 sm:p-6">
        <div className="border-b  flex flex-col gap-1 border-[#1A282D]">


        </div>
      </div>
    </div>
  )
}

export default LeftSiddBar