import express from "express";
const app=express()
app.use(express.json())

import 'dotenv/config'

const port=process.env.PORT||4000
console.log(process.env.PORT)


//database configuration
import {db_connect} from "./config/database.js";
db_connect()


//user signup route
import { user_signup } from "./routes/user_signup_route.js";
app.use(user_signup)



app.get('/',(req,res)=>{
    res.end("Server is working")
})

app.listen(port,()=>{
    console.log(`server is lstening on port ${port}`)
})