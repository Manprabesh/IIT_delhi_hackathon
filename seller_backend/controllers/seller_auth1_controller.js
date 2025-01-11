import Authentication_process_1_model from "../models/seller_Authentication_model.js";
import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



const seller_auth1_controller = async (req, res) => {
    const saltRounds = 3;
    // res.send("Seller router")
    const { seller_name, seller_email, seller_password } = req.body

    try {

            const salt =  bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(seller_password, salt);

        const seller = await Authentication_process_1_model.create({
            seller_name,
            seller_email,
            seller_password: hash
        })

        const token = jwt.sign({ seller_email }, 'secret_key');

        console.log(token)

        res.cookie("token",token,{ expiresIn: '1h' })

        return res.status(200).json(seller)

    } catch (err) {

        console.log("error");
        return res.status(400).end("Try again")

    }
}

export default seller_auth1_controller