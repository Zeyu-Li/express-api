const express = require("express")
const mongoose = require("mongoose")
const routes = require("./routes/routes")
const errorHandler = require("./middleware/errorHandler")

const app = express()

// takes in json
app.use(express.json())
app.use("/api", routes)
// must be registered last so it catches errors from every route
app.use(errorHandler)

// only connect and listen when run directly, so tests can import the app
if (require.main === module) {
    const mongooseURL = process.env.MONGODB_URI || "mongodb://localhost/api"
    const port = Number(process.env.PORT) || 3000

    // on mongodb error, print to console error
    mongoose.connection.on("error", err => {
        console.error(err)
    })

    mongoose.connect(mongooseURL)
        .then(() => app.listen(port))
        .catch(err => {
            console.error(err)
            process.exit(1)
        })
}

module.exports = app
