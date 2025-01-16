import Product from "../models/product_model.js";
import Authentication_process_1_model from "../models/seller_Authentication_model.js";

//For users to see all the product images
const product_download_controller = async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await Product.find(); // You can add additional filtering or sorting if needed

        // Map through the products and return the image URLs along with other details
        // const productsWithImageUrls = products.map(product => {
        //     return {
        //         product_name: product.product_name,
        //         product_description: product.product_description,
        //         product_price: product.product_price,
        //         productImageUrl: product.product_image_url, // Assuming it's an array of URLs
        //     };
        // });

        // Send the array of products with their image URLs to the frontend
        res.json({ products });

    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ message: "Error fetching products" });
    }
}


//For seller to download their product images
const product_download_controller_by_email=async(req,res)=>{
    const seller_email=res.user_data.seller_email
    console.log(seller_email)
    // console.log(seller_email)
    // res.json({"email":seller_email})
   const seller_products=await  Authentication_process_1_model.findOne({seller_email:seller_email}).populate("seller_product")

   console.log("From product_download_controller_by_email",seller_products)


   return res.status(200).json({"seller products": seller_products})
}

export  {product_download_controller,product_download_controller_by_email}