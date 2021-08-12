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

module.exports = router
// export {router}
