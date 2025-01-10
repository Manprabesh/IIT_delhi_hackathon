import { v2 as cloudinary } from 'cloudinary';

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

  console.log(arr_files)

  let j = 0;
  while (j < file_length) {
    const uploadResult = await cloudinary.uploader
    .upload(
      './uploads/'+arr_files[j]["filename"], {
      public_id: 'data'+[j],
    }
    ).catch((error) => {
      console.log(error);
    });
    j++
  }


  res.end("wait")
}

export default product_upload_controller