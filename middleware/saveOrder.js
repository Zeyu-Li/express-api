const {Order} = require("../models/models")

/**
 * saves the order
 * @param {*} req 
 * user request
 * @param {*} res 
 * user response
 * @param {*} next 
 * next piece of middleware callback
 * @returns response
 */
const saveOrder = async (req, res, next) => {
    // TODO: check if order exists to increase quantity?
    await Order.create({
        user: res.locals.user._id,
        product_id: res.locals.product.product_id,
    })
    next()
}

module.exports = saveOrder
