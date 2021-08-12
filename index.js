const express = require("express")
const mongoose = require("mongoose")

const app = express()

// can be changed to be .env if so chose later
const mongooseURL = "mongodb://localhost/api"

// model/db
mongoose.connect(mongooseURL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

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
app.use("/api", model)

// controller
app.listen(3000, ()=>{
    // console.log("Started Server")
    
})