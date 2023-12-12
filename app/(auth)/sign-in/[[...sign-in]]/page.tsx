import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-full w-full  flex layer  items-center justify-center">
      <SignIn afterSignInUrl="/"/>
    </div>

  )
}