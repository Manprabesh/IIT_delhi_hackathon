import { user_model } from "../models/user_model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import fs from 'fs'

const saltRounds = 5;

let privateKey = fs.readFileSync('./private.key', 'utf8');

console.log(privateKey)



const user_signup_controller = async (req, res) => {

    console.log("Incoming request");

    const { email, password, } = req.body
    const { name, phone_no } = req.body


    console.log(name)
    console.log(phone_no)

    if (name) {
        console.log(`My name is ${name}`)
    }
    else {
        console.log(`There is no name ${name}`)
    }

    bcrypt.genSalt(saltRounds, function (err, salt) {

        bcrypt.hash(password, salt, async function (err, hash) {

            // Store hash in your password DB.
            const user = await user_model.create({
                email: email,
                password: hash
            })


            jwt.sign({ email }, privateKey, { algorithm: 'HS256' }, function (err, token) {

                if (err) {
                    console.log(err);
                }

                res.cookie("token", token, {
                    httpOnly: true,
                    sameSite: "Strict",  // You might want to adjust this based on your cross-domain requirements
                });

                return res.json(user)

            });

        });
    });



}

export {
    user_signup_controller
}