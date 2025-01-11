import product_upload_controller from "../controllers/product_upload_controller.js";
import express from 'express'
const product_upload=express.Router()
import upload from "../middlewares/multer.js"
import jwt_verification from "../middlewares/jwt_verify.js";

// product_upload.post('/product/upload',upload.array('avatar', 12), product_upload_controller)
product_upload.post('/product/upload',jwt_verification,upload.array('avatar', 12), product_upload_controller)
export default product_upload