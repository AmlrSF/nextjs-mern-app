import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: String,
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment", 
    },
  ],
  content: String,
  NSFW: {
    type: Boolean,
    default: false,
  },
  Draft: {
    type: Boolean,
    default: true,
  },
});

const Post = mongoose.model("Post", postSchema);


export default Post;
