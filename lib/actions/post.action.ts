import { IPost } from "@/interfaces/post";
import { connectMongoDB } from "../mongoose";
import Post from "../models/post.model";


export async function createPost ({
  userId,
  Draft,
  NSFW,
  content,
  image,
  name
}: IPost): Promise<void> {

  console.log( userId,
    Draft,
    NSFW,
    content,
    image,
    name 
  )

  connectMongoDB();

  console.log( userId,
    Draft,
    NSFW,
    content,
    image,
    name 
  )

  try {
    const post = await Post.create({
      userId,
      Draft,
      NSFW,
      content,
      image,
      name
    });


    console.log(post);
  } catch (error) {
    console.log(error);
  }
};
