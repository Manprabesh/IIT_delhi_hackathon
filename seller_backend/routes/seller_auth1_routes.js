import seller_auth1_controller from '../controllers/seller_auth1_controller.js'
import seller_login_controller from '../controllers/seller_login_controller.js'
import set_cookie from '../middlewares/jwt_cookie.js'
import {product_download_controller, product_download_controller_by_email} from '../controllers/product_download_controller.js'

import express from 'express'
const seller_auth1=express.Router()

seller_auth1.post('/signup/auth1/',seller_auth1_controller)
seller_auth1.post('/login/',seller_login_controller,product_download_controller_by_email)

export default seller_auth1