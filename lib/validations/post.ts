import * as z from "zod";


export  const postValidationformSchema  = z.object({
    image:z.string().url(),
    name:z.string().min(3).max(30),
    content:z.string().min(3).max(3000),
    NSFW:z.boolean().default(false).optional(),
    Draft:z.boolean().default(false).optional()
})