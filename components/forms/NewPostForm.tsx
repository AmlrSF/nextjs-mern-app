"use client";


import * as z from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { MutableRefObject, ChangeEvent, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useUploadThing } from "@/lib/uploadthing";
import { postValidationformSchema } from "@/lib/validations/post";
import { Checkbox } from "../ui/checkbox";
import { createPost } from "@/lib/actions/post.action";

interface postUser {
    userId: string
}

const AccountForm = ({ userId }: { userId: any }) => {
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const { startUpload } = useUploadThing("imageUploader");

    const ImageInputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);

    const onSubmit = async (values: z.infer<typeof postValidationformSchema>) => {
        setLoading(true);
      
        try {
          const imgRes = await startUpload(files);
        
          if (imgRes && imgRes.length > 0 && imgRes[0].url) {
            values.image = imgRes[0].url;
           
            await createPost({
              userId,
              Draft: values.Draft,
              NSFW: values.NSFW,
              name: values.name,
              content: values.content,
              image: values.image
            });

            setLoading(false);

          } else {
            // Handle the case where image upload failed
            console.error("Image upload failed");
            setLoading(false);
          }
        } catch (error) {
          // Handle errors during the upload or post creation
          console.error("Error during submission:", error);
          setLoading(false);
        }
      };
      

    const handleImage = (
        e: ChangeEvent<HTMLInputElement>,
        fieldChange: (value: string) => void
    ) => {
        
        e.preventDefault();

        const fileReader = new FileReader();

        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFiles(Array.from(e.target.files));

            if (!file.type.includes("image")) return;

            fileReader.onload = async (event) => {
                const imageDataUrl = event.target?.result?.toString() || "";
                fieldChange(imageDataUrl);
            };

            fileReader.readAsDataURL(file);
        }
    };

    const form = useForm<z.infer<typeof postValidationformSchema>>({
        resolver: zodResolver(postValidationformSchema),
        defaultValues: {
            image: "",
            name: "",
            content: "",
        }
    })
    return (
        <Form {...form}>
            <form
                className='flex flex-col justify-start gap-5'
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name='image'
                    render={({ field }) => (
                        <FormItem className='flex mt-5 items-center gap-4'>
                            <FormLabel className='account-form_image-label flex justify-center w-full items-center'>
                                <div
                                    onClick={() => {
                                        const inputElement = ImageInputRef.current as HTMLInputElement | null;
                                        if (inputElement) {
                                            inputElement.click();
                                        }
                                    }}

                                    style={{ cursor: 'pointer' }}
                                >
                                    {
                                        field.value ?
                                            <Image
                                                src={field.value}
                                                alt='plus.png'
                                                width={96}
                                                height={96}
                                                priority
                                                className='rounded-md h-[200px] w-[100%] object-cover'
                                            />
                                            :

                                            <i className="fa-solid fa-plus text-9xl text-white font-extrabold"></i>

                                    }

                                </div>
                            </FormLabel>

                            <FormControl className='flex-1 text-base-semibold hidden text-gray-200'>
                                <Input
                                    ref={ImageInputRef}
                                    type='file'
                                    accept='image/*'
                                    placeholder='Add profile photo'
                                    className='account-form_image-input text-white'
                                    onChange={(e) => handleImage(e, field.onChange)}
                                    style={{ display: 'none' }} // Hide the input visually
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col gap-1'>
                            <FormLabel className='text-base-semibold text-white '>
                                Name
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type='text'
                                    className='bg-[#1A282D] text-white no-focus'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='content'
                    render={({ field }) => (
                        <FormItem className='flex w-full  flex-col gap-1'>
                            <FormLabel className='text-base-semibold text-white '>
                                Bio
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    rows={5}
                                    className='bg-[#1A282D] text-white  no-focus'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="NSFW"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    🚫 NSFW
                                </FormLabel>
                            </div>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="Draft"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    📄 Draft
                                </FormLabel>
                            </div>
                        </FormItem>
                    )}
                />


                <Button type='submit' className='text-white font-medium
         text-xl rounded-lg bg-[#FF4500] hover:bg-[#FF4500]'>
                    {loading ? `Posting...` : "Post"}
                </Button>
            </form>
        </Form>
    )
}

export default AccountForm;