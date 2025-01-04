import express from 'express'
const user_login=express.Router()
import { user_login_controller } from '../controller/user_login_controller.js'
import cookieParser from 'cookie-parser'
user_login.use(cookieParser())

user_login.get('/user/login', user_login_controller)

export{
    user_login
}



