import product_upload_controller from "../controllers/product_upload_controller.js";
import express from 'express'
const product_upload=express.Router()
import upload from "../middlewares/multer.js"

product_upload.post('/product/upload',upload.array('avatar', 12), product_upload_controller)
export default product_upload