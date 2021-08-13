/* controller */
const express = require("express")
const {User, Product, Order} = require("../models/models")
// middleware
const findProduct = require("../middleware/findProduct")
const saveOrder = require("../middleware/saveOrder")
const getUser = require("../middleware/getUser")

const router = express.Router()

// get all orders
router.get("/", (req, res) => {
    // from https://stackoverflow.com/questions/14103615/mongoose-get-full-list-of-users
    Order.find({}, (err, orders) => {
        let orderMap = {}

        orders.forEach((order) => {
            orderMap[order._id] = order;
        });
        return res.status(200).send({orders: orders})
    })
})

router.post("/", findProduct, getUser, saveOrder, async (req, res) => {
    return res.status(200).send("Order successfully placed")
})

// for updating (if needed)
// router.patch("/", async (req, res) => {
//     res.send("Patch")
// })

// adds a product
router.post("/products", async (req, res) => {
    const product = new Product({
        product_id: req.body.product_id
    })

    product.save().then(result => {
        // if successfully added product, send the message of
        // Product added successfully on code 200 
        res.status(200).json({message: "Product added successfully"})
    }).catch(err => {
        // else fail to save output message
        // TODO: parse error in middleware so not to send the raw error to user
        res.status(400).json({message: err.message})
    })
})


module.exports = router
// export {router}
