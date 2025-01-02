import mongoose, { mongo } from "mongoose";

const db_connect=async ()=>{
mongoose.connection.on('open', () => console.log('Database connected'));
mongoose.connection.on('disconnected', () => console.log('disconnected'));
mongoose.connection.on('close', () => console.log('close'));
const db=await mongoose.connect(process.env.Mongo_Db_uri)
}

export {
    db_connect
}