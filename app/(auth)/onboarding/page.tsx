import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import AccountForm from "@/components/forms/AccountForm";
import { fetchUser } from "@/lib/actions/user.action";

async function Page() {
  const user = await currentUser();
  if (!user) return null; // to avoid typescript warnings

  const userInfo = await fetchUser(user.id);
  if (userInfo?.onboarded) redirect("/");
  
  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };


  return (
    <section className="layer">
      <main className='mx-auto  flex max-w-3xl flex-col justify-start mt-10 px-10'>
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