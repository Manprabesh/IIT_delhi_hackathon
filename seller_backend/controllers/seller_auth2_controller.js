import mongoose from "mongoose";
import seller_auth_2 from "../models/seller_Authentication2_model.js";
import Authentication_process_1_model from "../models/seller_Authentication_model.js";

const seller_auth_2_controller = async (req, res, next) => {
    const { bank_account_no, pan_no, gst_no } = req.body
    console.log(bank_account_no,pan_no,gst_no)
    const the_email=req.user_data.seller_email;

    // if(!the_email){
    //     return res.json("You need to login")

    // }
    console.log("email ", the_email)

    const seller_info=await Authentication_process_1_model.findOne({seller_email:the_email})
    console.log(seller_info._id)

    let one_ac=await seller_auth_2.findOne({seller_id:seller_info._id})

    console.log("seller one account", one_ac)
    if(one_ac){
        return res.json("you already have an account")
    }


  console.log('seller info :',seller_info)

    const seller_exist=await seller_auth_2.findOne({ $or: [{ bank_account_no: bank_account_no }, { gst_no: gst_no }]})
    console.log(seller_exist);

    if(seller_exist){

        return res.json("seller already exist")
    }
    else{

     try {
        if (seller_info) {
            const seller_personal_info = await seller_auth_2.create({
                seller_id:seller_info._id,
                pan_no,
                gst_no,
                bank_account_no,
            })

            // res.json(seller_personal_info)
            next()
        }
        else{
            return res.json("You need to sign up")
        }
    } catch (error) {
        console.log(error);

    }}



}

export default seller_auth_2_controller