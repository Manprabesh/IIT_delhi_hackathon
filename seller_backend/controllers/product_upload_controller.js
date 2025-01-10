import { v2 as cloudinary } from 'cloudinary';
import Product from '../models/product_model.js';

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

  const file_length = req.files.length
  const arr_files = [];

  let i = 0

  while (i < file_length) {
    arr_files.push(req.files[i])
    i++
  }

  // product_upload_to_database()

  // console.log(arr_files)
  let uploadResult = []
  let j = 0;
  while (j < file_length) {
    uploadResult = await cloudinary.uploader
      .upload(
        './uploads/' + arr_files[j]["filename"], {
        public_id: arr_files[j]["originalname"],
      }
      ).catch((error) => {
        console.log(error);
      });
    console.log("image no" + [j], uploadResult.url)
    j++
  }

  product_upload_to_database(arr_files, uploadResult)
  res.end("wait")
}

const product_upload_to_database = async (arr_files, uploadResult) => {
  // await product_upload_controller.create([

  // ])
  // console.log(arr_files[0])
  const length_of_files = arr_files.length
  const length_of_url = uploadResult.length
  console.log(uploadResult);

// let i=0,j=0;
//   while (i < length_of_files || j < length_of_url) {

//     await Product.create({
//       product_name: arr_files[i]['originalname'],
//       product_image_url: uploadResult[j]['url']
//     })

//     i++;
//     j++
//   }
}

export default product_upload_controller