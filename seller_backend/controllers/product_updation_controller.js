import Authentication_process_1_model from "../models/seller_Authentication_model.js"
import product_upload from "../routes/product_upload_model.js"

// const p_data = await Product.find({ product_name: 'Hackathon_data_models.png' }).populate("product_upload_by")


const product_update_controller = async (req, res) => {
    console.log(res.user_data.seller_email)
    const seller_product_info = await Authentication_process_1_model.findOne({ seller_email: res.user_data.seller_email }).populate("seller_product")

    const seller_product_length = seller_product_info.seller_product.length


    // console.log(seller_product_info.seller_product[1]["product_name"])

    console.log("pv name", req.body.product_previous_name)
    console.log("latest name",req.body.product_latest_name)

    let seller_product_list = []

    let i = 0
    while (i < seller_product_length) {
        const P_name=seller_product_info.seller_product[i]["product_name"]
        if(P_name==req.body.product_previous_name){
            console.log("product found")
            break
        }
        else{
            console.log("product not found");

        }
        i++
    }



    // console.log(seller_product_list)

    // seller_producta_info.populate("")
    return res.json(seller_product_info)
}


export default product_update_controller