import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import AccountForm from "@/components/forms/AccountForm";

async function Page() {
  const user = await currentUser();
  if (!user) return null; // to avoid typescript warnings

  // const userInfo = await fetchUser(user.id);

  // if (userInfo?.onboarded) redirect("/");

  const userData = {
    id: user.id,
    objectId: "ff",
    username: "",
    name: false ?"gg" : "gg",
    image: false ? "gg" : user.imageUrl,
    bio:"gg"
  };

  return (
    <section className="layer">
      <main className='mx-auto  flex max-w-3xl flex-col justify-start px-10 py-20'>
      <section className='zmt-9 bg-[#0B1416]  rounded-xl p-10'>
      <h1 className='text-3xl text-white'>Profile Details</h1>
      <p className=' mb-5 mt-[-5px] text-slate-600'>
        Complete your profile now, to use Reddit.
      </p>
        <AccountForm  user={userData} btnTitle="Submit" />
      </section>
    </main>
    </section>
  );
}

export default Page;