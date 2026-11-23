/* controller */
const express = require("express")
const {Product, Order} = require("../models/models")
// middleware
const validateOrder = require("../middleware/validateOrder")
const findProduct = require("../middleware/findProduct")
const saveOrder = require("../middleware/saveOrder")
const getUser = require("../middleware/getUser")

const router = express.Router()

// mongodb duplicate key error code
const DUPLICATE_KEY = 11000

// get all orders
router.get("/", async (req, res) => {
    const orders = await Order.find({})
    return res.status(200).send({orders: orders})
})

router.post("/", validateOrder, findProduct, getUser, saveOrder, async (req, res) => {
    return res.status(200).send("Order successfully placed")
})

// for updating (if needed)
// router.patch("/", async (req, res) => {
//     res.send("Patch")
// })

// adds a product
router.post("/products", async (req, res) => {
    const product_id = req.body?.product_id
    if (!Number.isInteger(product_id)) {
        return res.status(400).json({message: "The request data is invalid or not clean"})
    }

    try {
        await Product.create({product_id})
    } catch (err) {
        if (err.code === DUPLICATE_KEY) {
            // don't send the raw database error (it names the db, collection and index)
            return res.status(400).json({message: `The product with the id of ${product_id} already exists`})
        }
        throw err
    }
    // if successfully added product, send the message of
    // Product added successfully on code 200 
    return res.status(200).json({message: "Product added successfully"})
})


module.exports = router
// export {router}
