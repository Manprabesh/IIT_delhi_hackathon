import express from "express";
const app=express()
app.use(express.json())

import 'dotenv/config'
import cookieParser from 'cookie-parser'
// app.use(cookieParser)

const port=process.env.PORT||4000
console.log(process.env.PORT)


//database configuration
import {db_connect} from "./config/database.js";


//user signup route
import { user_signup } from "./routes/user_signup_route.js";
app.use(user_signup)

//user login route
import  {user_login}  from "./routes/user_login_route.js";
app.use(user_login)


app.get('/',(req,res)=>{
    res.end("Server is working")
})

app.listen(port,async()=>{

 await db_connect()
 console.log(`server is lstening on port ${port}`)

})

// -----BEGIN RSA PRIVATE KEY-----
// -----END RSA PRIVATE KEY-----
