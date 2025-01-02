import { user_model } from "../models/user_model.js"

const user_signup_controller = async (req, res) => {
    console.log("Incoming request");

    const { email, password } = req.body
    const user = await user_model.create({
        email: email,
        password: password
    })
    res.json(user)

}

export {
    user_signup_controller
}