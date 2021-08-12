const {User, Product, Order} = require("../models/models")

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
    // check if user exists
    let order
    try {
        // check if product is within the database
        await User.find({first_name: req.body.first_name, last_name: req.body.last_name, phone_number: req.body.phone_number}).then((result)=>{
            // if no product found length will be 0
            if (result.length === 0) {
                // TODO: create user
            }
        }).catch(error => {
            return res.status(500).json({message: "The request data is invalid or not clean"})
        })
    } catch (err) {
        // console.log(err)
        return res.status(400).json({message: "The request data is invalid or not clean"})
    }

    res.order = order
    next()
}

module.exports = saveOrder
