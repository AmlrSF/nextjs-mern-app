import mongoose from "mongoose";
let isConnected = false;

export const connectMongoDB = ()=>{
    mongoose.set('strictQuery', true);

    if(!process.env.MNGO_DB_URL) return console.log("Mongo db url not found");
    if(isConnected) return console.log("Already connnected to mongodb");


    try {
       
        mongoose.connect(process.env.MNGO_DB_URL);

        isConnected = true;
        console.log("connected to mongoDB");

    } catch (error) {
        console.log(error);
    }

}