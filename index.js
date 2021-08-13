const express = require("express")
const mongoose = require("mongoose")
const mongoSanitize = require('express-mongo-sanitize')

const app = express()

// can be changed to be .env if so chose later
const mongooseURL = "mongodb://localhost/api"

// model/db
mongoose.connect(mongooseURL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

// remove db (for testing)
// mongoose.connection.dropDatabase()

// on mongodb error, print to console error
db.on("error", err => {
    console.error(err)
})

// db.once("open", err => {
//     console.log("DB on open")
// })


// takes in json
app.use(express.json())

// gets model from model/model
const model = require("./routes/routes")
const models = require("./models/models")
// sanitizes json strings
app.use(mongoSanitize({
    onSanitize: ({ req, key }) => {
        req.status(400).send("The request data is invalid or not clean")
    },
}))
app.use("/api", model)

// controller
app.listen(3000, ()=>{
    // console.log("Started Server")
})

module.exports = app
