import express from 'express'
const user_signup=express.Router()
import { user_signup_controller } from '../controller/user_signup_controller.js'

user_signup.post('/user/signup',user_signup_controller)

export{
    user_signup
}