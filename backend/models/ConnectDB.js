import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

async function main(){
    try {
        console.log(process.env.MONGODB_URL)
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("connected to DB");

    } catch (error) {
        console.error("error while connecting database");
    }
}

export default main;