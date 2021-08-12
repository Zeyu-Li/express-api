const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
})

const productSchema = new mongoose.Schema({
})

const orderSchema = new mongoose.Schema({
})

const APIRequestSchema = new mongoose.Schema({
})

module.exports = [mongoose.model("user", userSchema), mongoose.model("product", productSchema)]
