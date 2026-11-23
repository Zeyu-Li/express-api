const isNonEmptyString = value => typeof value === "string" && value.trim() !== ""

/**
 * rejects requests whose fields are not the expected plain types, so query
 * operators like {"$ne": null} can never reach a mongodb filter
 * @param {*} req
 * user request
 * @param {*} res
 * user response
 * @param {*} next
 * next piece of middleware callback
 * @returns response
 */
const validateOrder = (req, res, next) => {
    const {first_name, last_name, phone_number, product_id} = req.body ?? {}
    const valid = [first_name, last_name, phone_number].every(isNonEmptyString) &&
        Number.isInteger(product_id)

    if (!valid) {
        return res.status(400).json({message: "The request data is invalid or not clean"})
    }
    next()
}

module.exports = validateOrder
