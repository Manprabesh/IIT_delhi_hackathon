import seller_auth1_controller from '../controllers/seller_auth1_controller.js'
import express from 'express'
const seller_auth1=express.Router()

seller_auth1.post('/signup/auth1/',seller_auth1_controller)

export default seller_auth1