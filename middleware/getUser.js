const {User} = require("../models/models")

/**
 * gets the user if it exists otherwise create a new user
 * @param {*} req 
 * user request
 * @param {*} res 
 * user response
 * @param {*} next 
 * next piece of middleware callback
 * @returns response
 */
const getUser = async (req, res, next) => {
    const {first_name, last_name, phone_number} = req.body
    const user = await User.findOne({first_name, last_name, phone_number}) ??
        await User.create({first_name, last_name, phone_number})

    // pass users between middleware
    res.locals.user = user
    next()
}

module.exports = getUser
