export interface IPost {
    userId: string; // Reference to User
    image: string;
    name: string;
    content: string;
    NSFW?: boolean;
    Draft?: boolean;
  }