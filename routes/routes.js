const express = require("express")
const router = express.Router()
const {User, Product, Order} = require("../models/models")

// test get
router.get("/", (req, res) => {
    res.send("Get Successful")
})

router.post("/", async (req, res) => {
    //
    res.send("Post")
})

// for updating
router.patch("/", async (req, res) => {
    //
    res.send("Patch")
})

// adds a product
router.post("/products", async (req, res) => {
    const product = new Product({
        product_id: req.body.product_id
    })

    product.save().then(result => {
        res.status(200).json({message: "Product added successfully"})
    }).catch(err => {
        res.status(400).json({message: err.message})
    })
})

module.exports = router
// export {router}
