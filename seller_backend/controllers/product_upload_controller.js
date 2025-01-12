import { v2 as cloudinary } from 'cloudinary';
import Product from '../models/product_model.js';
import Authentication_process_1_model from '../models/seller_Authentication_model.js';
// import jwt_verification from '../middlewares/jwt_verify.js';
// import Authentication_process_1_model from '../models/seller_Authentication_model.js';

const product_upload_controller = async (req, res) => {

  if (!req.files) {
    return res.status(400).json({
      message: "No file uploaded!",
    });
  }

  let product_details = {product_name:req.body.product_name,
    product_description:req.body.product_description,
    product_price:req.body.product_price,
  }
  console.log(product_details.product_name)



  cloudinary.config({
    cloud_name: 'dhbkfleac',
    api_key: '338358144134781',
    api_secret: '3Ti_FPO0ZjLtPzE5jSZ3bTmrjF4' // Click 'View API Keys' above to copy your API secret
  });


  const seller_data = res.user_data.seller_email
  console.log("The email", res.user_data.seller_email)


  const file_length = req.files.length

  //The arr_files store the values of file from -> req.files
  const arr_files = [];

  let i = 0
  // console.log(req.files)

  while (i < file_length) {

    arr_files.push(req.files[i])
    i++

  }

  //The result avriable store the values from cloudinary
  let result = []

  let j = 0;

  while (j < file_length) {

    const uploadResult = await cloudinary.uploader
      .upload(
        './uploads/' + arr_files[j]["filename"], {
        public_id: product_details.product_name,
      })
      .catch((error) => {
        console.log(error);
      });

    result.push(uploadResult)

    j++

  }

  let product_data=await product_upload_to_database(arr_files, result, seller_data, product_details)
  console.log("______________")
  console.log(product_data)
  res.json({product_data})
}

const product_upload_to_database = async (arr_files, result, seller_data, product_details) => {

  const length_of_files = arr_files.length
  const length_of_url = result.length

  console.log(length_of_files);

  let arr_of_image_url = [];

  let i = 0

  while (i < length_of_files) {

    arr_of_image_url.push(result[i]['url'])

    i++;

  }


  //Checking for the seller

  const seller_model = await Authentication_process_1_model.findOne({ seller_email: seller_data })


  //inserting product

  const product_data = await Product.create({
    product_name:product_details.product_name,
    product_image_url: arr_of_image_url,
    product_description:product_details.product_description,
    product_price:product_details.product_price,
    product_upload_by: seller_model
  })

  console.log("product data", product_data)


seller_model.seller_product.push(product_data._id)
await seller_model.save()


  console.log("**************************")

 return product_data

}




export default product_upload_controller