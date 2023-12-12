import NewPostForm from '@/components/forms/NewPostForm'
import { fetchUser } from '@/lib/actions/user.action';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async() => {
    const user = await currentUser();
    if (!user) return null;
  
    // fetch organization list created by user
    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");
  
    return (
        <div className='w-full h-full sm:flex-row flex-col  flex gap-4 items-start'>
            <div className='  bg-[#000]    w-full border-b p-5 border-[#1A282D]'>
                <div className='border-b flex justify-between items-center border-[#1A282D]'>
                    <h1 className='text-3xl  text-white font-bold'>New Post</h1>
                    <div className='text-lg text'>
                        draft
                        <span className='bg-[##818384] p-1  rounded-md'>0</span>
                    </div>
                </div>
                <NewPostForm userId={userInfo._id} />
            </div>
            <div className='bg-[#000] sm:w-[450px]  w-full p-4'>
                <h1 className='text-xl pl-5 font-medium mb-5'>
                    Posting to Reddit
                </h1>
                <ul>
                    <li className='text-lg border-b p-2 border-[#1A282D] text-white-600 font-light'> Remember the human</li>
                    <li className='text-lg border-b p-2 border-[#1A282D] text-white-600 font-light'>Behave like you would in real life</li>
                    <li className='text-lg border-b p-2 border-[#1A282D] text-white-600 font-light'>Look for the original source of content</li>
                    <li className='text-lg border-b p-2 border-[#1A282D] text-white-600 font-light'>Search for duplicates before posting</li>
                    <li className='text-lg p-2 text-white-600 font-light'>Read the community’s rules</li>
                </ul>
            </div>
        </div>
    )
}

export default page