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
    // check if user exists
    let user

    try {
        // check if product is within the database
        await User.find({"$and": [{first_name: req.body.first_name}, {last_name: req.body.last_name}, {phone_number: req.body.phone_number}]}).then((result)=>{
            // if no product found length will be 0
            if (result.length === 0) {
                try {
                    // create user
                    user = new User({
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        phone_number: req.body.phone_number,
                    })
                    
                    user.save().then(result => {
                        // if successfully added user, console out
                        // console.log(result)
                    }).catch(err => {
                        // else fail to save output message
                        // TODO: parse error in middleware so not to send the raw error to user
                        res.status(400).json({message: err.message})
                    })
                } catch (err) {
                    return res.status(500).json({message: "The request data is invalid or not clean"})
                }
            } else {
                user = result
            }
        }).catch(error => {
            return res.status(500).json({message: "The request data is invalid or not clean"})
        })
    } catch (err) {
        // console.log(err)
        return res.status(400).json({message: "The request data is invalid or not clean"})
    }

    // pass users between middleware
    console.log(user)
    
    res.locals.user = user
    next()
}

module.exports = getUser
