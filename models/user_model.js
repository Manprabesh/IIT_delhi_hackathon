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

    name: {
        type: String,
        // required: true
    },

    phone_no: {
        type: Number,
        // required: true,
        // unique: true
    },

    user_review: {
        type: String
    },

    order_list: {
        type: String
    },

    user_address: {
        type: String
    },

    cart_items: {
        type: String
    }

})


const user_model = new mongoose.model("user_model", user_schema)
export {
    user_model
}