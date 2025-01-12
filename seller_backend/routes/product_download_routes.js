import express from 'express'
const product_download=express.Router()
import product_download_controller from '../controllers/product_download_controller.js'

product_download.get('/product/download',product_download_controller)
export default product_download