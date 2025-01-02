import mongoose from "mongoose";

const user_schema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
})

const user_model = new mongoose.model("user_model", user_schema)
export {
    user_model
}