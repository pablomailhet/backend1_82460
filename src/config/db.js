import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();

const user = process.env.DB_user;
const pass = process.env.DB_pass;

const connectDB = async() => {
    try{
        return await mongoose.connect(`mongodb+srv://${user}:${pass}@codercluster.pzv7p.mongodb.net/coderDB?retryWrites=true&w=majority&appName=coderCluster`);
    }
    catch(error){
        console.error(error);
    }
};

export default connectDB;