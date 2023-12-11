"use client";


import * as z from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { userValidationformSchema } from "@/lib/validations/user";

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
import { User } from "@clerk/nextjs/server";
import { userInfo } from "os";
import IUser from "@/interfaces/Iuser";


const AccountForm = ({ user, btnTitle }: IUser) => {
  const [files, setFiles] = useState<File[]>([]);

  function onSubmit(values: z.infer<typeof userValidationformSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

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

  const form = useForm<z.infer<typeof userValidationformSchema>>({
    resolver: zodResolver(userValidationformSchema),
    defaultValues: {
      image: "",
      name: "",
      username: "",
      bio: "",
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
            <FormItem className='flex items-center gap-4'>
              <FormLabel className='account-form_image-label'>
                {field.value ? (
                  <Image
                    src={field.value}
                    alt='profile_icon'
                    width={96}
                    height={96}
                    priority
                    className='rounded-full h-[96px] w-[96px] object-cover'
                  />
                ) : (
                  <Image
                    src='/assets/profile.svg'
                    alt='profile_icon'
                    width={24}
                    height={24}
                    className='object-cover'
                  />
                )}
              </FormLabel>
              <FormControl className='flex-1 text-base-semibold  text-gray-200'>
                <Input
                  type='file'
                  accept='image/*'
                  placeholder='Add profile photo'
                  className='account-form_image-input'
                  onChange={(e) => handleImage(e, field.onChange)}
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
                  className='bg-[#1A282D] no-focus'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-1'>
              <FormLabel className='text-base-semibold text-white '>
                Username
              </FormLabel>
              <FormControl>
                <Input
                  type='text'
                  className='bg-[#1A282D] no-focus'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-1'>
              <FormLabel className='text-base-semibold text-white '>
                Bio
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={10}
                  className='bg-[#1A282D] no-focus'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='bg-primary-500'>
          {btnTitle}
        </Button>
      </form>
    </Form>
  )
}

export default AccountForm