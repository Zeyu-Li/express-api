const mongoose = require("mongoose")
// defense in depth against NoSQL injection: query filters treat any
// user-supplied "$" operator object as a literal value instead of an operator
mongoose.set("sanitizeFilter", true)

// database schema for mongodb
// user with first name, last name, and phone number
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

// simple product with just an ID
const productSchema = new mongoose.Schema({
    product_id: {
        type: Number,
        required: true,
        unique: true,
        integer: true,
    },
    // TODO: quantity
})

// order correlates (one to many) with the user and the product id directly
const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
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
