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
    const product = await Product.findOne({product_id: req.body.product_id})
    if (!product) {
        // if product is not found, stop here so no order is created
        return res.status(400).json({message: `The product with the id of ${req.body.product_id} is not found`})
    }

    res.locals.product = product
    next()
}

module.exports = findProduct
