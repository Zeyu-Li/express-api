const mongoose = require("mongoose")
// stops errors
mongoose.set('useCreateIndex', true)

// database schema for mongodb
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
    },
})

const productSchema = new mongoose.Schema({
    product_id: {
        type: Number,
        required: true,
        unique: true,
        integer: true,
    },
    // TODO: quantity
})

const orderSchema = new mongoose.Schema({
    product_id: {
        type: Number,
        required: true,
        integer: true,
    },
    // TODO: shopping cart quantity
})

const APIRequestSchema = new mongoose.Schema({
})

module.exports = {
    User: mongoose.model("user", userSchema), 
    Product: mongoose.model("product", productSchema), 
    Order: mongoose.model("order", orderSchema)
}
