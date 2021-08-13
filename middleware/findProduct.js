const {Product} = require("../models/models")

/**
 * finds if product exists, otherwise return
 * @param {*} req 
 * user request
 * @param {*} res 
 * user response
 * @param {*} next 
 * next piece of middleware callback
 * @returns response
 */
const findProduct = async (req, res, next) => {
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
            return res.status(400).json({message: "The request data is invalid or not clean"})
        })
    } catch (err) {
        // console.log(err)
        return res.status(400).json({message: "The request data is invalid or not clean"})
    }

    res.product = product
    // if product is not found, the next piece of middleware 
    // invoked by the next() callback will not be triggered
    next()
}

module.exports = findProduct
