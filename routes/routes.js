const express = require("express")
const router = express.Router()
const {User, Product, Order} = require("../models/models")

const saveOrder = async (req, res, next) => {
    let product
    try {
        // TODO: sanitize
        let request_product_id = parseInt(req.body.product_id)
        // check if product is within the database
        await Product.find({product_id: request_product_id}).then((result)=>{
            // if no product found length will be 0
            if (result.length === 0) {
                // if product is not found, return error with message
                // NOTE: message json may not be safe
                return res.status(400).json({message: `The product with the id of ${req.body.product_id} is not found`})
            }
        }).catch(error => {
            return res.status(500).json({message: "The request data is invalid or not clean"})
        })
    } catch (err) {
        // console.log(err)
        return res.status(400).json({message: "The request data is invalid or not clean"})
    }

    res.product = product
    next()
}

// test get
router.get("/", (req, res) => {
    res.send("Get Successful")
})

router.post("/", saveOrder, async (req, res) => {
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
