import { v2 as cloudinary } from 'cloudinary';
import Product from '../models/product_model.js';
import Authentication_process_1_model from '../models/seller_Authentication_model.js';
// import jwt_verification from '../middlewares/jwt_verify.js';

const product_upload_controller = async (req, res) => {

  if (!req.files) {
    return res.status(400).json({
      message: "No file uploaded!",
    });
  }


  cloudinary.config({
    cloud_name: 'dhbkfleac',
    api_key: '338358144134781',
    api_secret: '3Ti_FPO0ZjLtPzE5jSZ3bTmrjF4' // Click 'View API Keys' above to copy your API secret
  });


  const seller_data = res.user_data.seller_email
  console.log("The email", res.user_data.seller_email)


  const file_length = req.files.length
  const arr_files = [];

  let i = 0

  while (i < file_length) {

    arr_files.push(req.files[i])
    i++

  }


  let result = []
  let j = 0;

  while (j < file_length) {

    const uploadResult = await cloudinary.uploader
      .upload(
        './uploads/' + arr_files[j]["filename"], {
        public_id: arr_files[j]["originalname"],
      })
      .catch((error) => {
        console.log(error);
      });

    result.push(uploadResult)

    j++

  }



  product_upload_to_database(arr_files, result, seller_data)
  res.end("wait")
}

const product_upload_to_database = async (arr_files, result, seller_data) => {

  const length_of_files = arr_files.length
  const length_of_url = result.length

  console.log(length_of_files);


  let arr1 = [];
  let arr2 = [];


  let i = 0, j = 0;

  while (i < length_of_files || j < length_of_url) {

    arr1.push(arr_files[i]['originalname'])
    arr2.push(result[j]['url'])

    i++;
    j++

  }

  console.log(arr1)


  //Checking for the seller

  const seller_model = await Authentication_process_1_model.findOne({ seller_email: seller_data })
  console.log(seller_model)


  //inserting product

  const product_data = await Product.create({
    product_name: arr1,
    product_image_url: arr2,
    product_upload_by: seller_model
  })
  console.log(product_data)

  //populating the "product_upload_by" attribute and displaying it
  const p_data = await Product.findOne({ product_name: 'Hackathon_data_models.png' }).populate("product_upload_by")
  console.log("product data: ", p_data)

}


export default product_upload_controller