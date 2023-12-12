import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-full w-full flex items-center layer justify-center">
      <SignUp afterSignUpUrl="/onboarding" />
    </div>
  )
}