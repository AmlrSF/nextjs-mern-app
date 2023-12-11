"use client";


import * as z from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {  userValidationformSchema } from "@/lib/validations/user";

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


const AccountForm = () => {
    function onSubmit(values: z.infer<typeof userValidationformSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    
    const form = useForm<z.infer<typeof userValidationformSchema>>({
        resolver: zodResolver(userValidationformSchema),
        defaultValues: {
            prodile_photo:"",
            name:"",
            username:"",
            bio: "",
        }
    })
    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    )
}

export default AccountForm