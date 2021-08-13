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

    try {
        // console.log(res.locals.user)
        
        // create new order
        const order = new Order({
            user: res.locals.user[0]._id,
            product_id: req.body.product_id,
        })
        
        order.save().then(result => {
            // if successfully added user, console out
            // console.log(result)
            next()
        }).catch(err => {
            // else fail to save output message
            // TODO: parse error in middleware so not to send the raw error to user
            return res.status(400).json({message: err.message})
        })
    } catch (err) {
        return res.status(500).json({message: "The request data is invalid or not clean"})
    }
}

module.exports = saveOrder
