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
const product_download_controller_by_email = async (req, res) => {
    const seller_email = res.user_data.seller_email
    console.log(seller_email)
    // console.log(seller_email)
    // res.json({"email":seller_email})
    const seller_products = await Authentication_process_1_model.findOne({ seller_email: seller_email }).populate("seller_product")

    console.log("From product_download_controller_by_email", seller_products)


    return res.status(200).json({ "seller products": seller_products })
}

const product_download_by_category = async (req, res) => {
    const { product_category, min_price, max_price, product_name } = req.body

    //Add logic for verifying incoming data -> if(product_name){}

    console.log(typeof (min_price))

    let min_num = Number(min_price)
    let max_num = Number(max_price)
    console.log(typeof (num))


    let product_obj = {
        product_name:{ $regex: product_name, $options: "i" },
        product_category: { $regex: product_category, $options: "i" },
        product_price: { $gte: min_num, $lte: max_num }
    }
    console.log(product_obj)

    console.log(product_obj.product_price.$gte)
    console.log(product_obj.product_price.$lte)

    const product_list = await Product.find(product_obj)
    res.json(product_list)
}

export { product_download_controller, product_download_controller_by_email, product_download_by_category }