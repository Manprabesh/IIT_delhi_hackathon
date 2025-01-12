import Product from "../models/product_model.js";

const product_download_controller = async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await Product.find(); // You can add additional filtering or sorting if needed

        // Map through the products and return the image URLs along with other details
        const productsWithImageUrls = products.map(product => {
            return {
                product_name: product.product_name,
                product_description: product.product_description,
                product_price: product.product_price,
                product_image_url: product.product_image_url, // Assuming it's an array of URLs
            };
        });

        // Send the array of products with their image URLs to the frontend
        return res.json({ products: productsWithImageUrls });

    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ message: "Error fetching products" });
    }
}

export default product_download_controller