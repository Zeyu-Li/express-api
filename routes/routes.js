/* controller */
const express = require("express")
const {User, Product, Order} = require("../models/models")
const findProduct = require("../middleware/findProduct")
const saveOrder = require("../middleware/saveOrder")

const router = express.Router()

// test get
router.get("/", (req, res) => {
    res.send("Get Successful")
})

router.post("/", findProduct, saveOrder, async (req, res) => {
    // res.status(200).send("Order successfully placed")
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
