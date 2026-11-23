const {describe, test, before, after} = require("node:test")
const assert = require("node:assert/strict")
const request = require("supertest")
const mongoose = require("mongoose")
const {MongoMemoryServer} = require("mongodb-memory-server")
const app = require("./index")
const {Product, Order} = require("./models/models")

const elon = {
    "first_name": "Elon",
    "last_name": "Musk",
    "phone_number": "(123) 456-1234",
}

let mongoServer

// throwaway in-memory database, so the tests don't need a local mongodb
// the first run downloads the mongod binary, so allow up to 2 minutes
before(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
    // make sure the unique product_id index exists before the duplicate test
    await Product.init()
}, {timeout: 120000})

after(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
})

// get orders (should be zero)
describe("GET / api", () => {
    describe("Get orders", ()=>{
        test("Should be empty", async () => {
            const response = await request(app).get("/api")
            assert.equal(response.statusCode, 200)
            assert.equal(response.body.orders.length, 0)
        })
    })
})

// post product
describe("POST / api", () => {
    describe("Add product", ()=>{
        test("Product Added", async () => {
            const response = await request(app).post("/api/products").send({
                "product_id": 2345
            })
            assert.equal(response.statusCode, 200)
        })
    })
})

// add to cart (user is created on their first order)
describe("POST / api", () => {
    describe("Add product to Card", ()=>{
        test("Product Added", async () => {
            const response = await request(app).post("/api").send({...elon, "product_id": 2345})
            assert.equal(response.statusCode, 200)
        })
    })
})

// Bad Order (item does not exist)
describe("POST / api", () => {
    describe("Add product to Card", ()=>{
        test("Product does not exist", async () => {
            const response = await request(app).post("/api").send({...elon, "product_id": 52345})
            assert.equal(response.statusCode, 400)
            assert.equal(response.body.message, "The product with the id of 52345 is not found")
        })
    })
})

describe("GET / api", () => {
    describe("Get orders", ()=>{
        test("Should have one order (the bad order was not saved)", async () => {
            const response = await request(app).get("/api")
            assert.equal(response.statusCode, 200)
            assert.equal(response.body.orders.length, 1)
        })
    })
})

// post product again but should error since it is the same one
describe("POST / api", () => {
    describe("Add product", ()=>{
        test("Duplicate product rejected without leaking the database error", async () => {
            const response = await request(app).post("/api/products").send({
                "product_id": 2345
            })
            assert.equal(response.statusCode, 400)
            assert.equal(response.body.message, "The product with the id of 2345 already exists")
        })
    })
})

// new product
describe("POST / api", () => {
    describe("Add product", ()=>{
        test("Product Added", async () => {
            const response = await request(app).post("/api/products").send({
                "product_id": 52345
            })
            assert.equal(response.statusCode, 200)
        })
    })
})

// Order (item do exist now!)
describe("POST / api", () => {
    describe("Add product to Card", ()=>{
        test("Product Added", async () => {
            const response = await request(app).post("/api").send({...elon, "product_id": 52345})
            assert.equal(response.statusCode, 200)
        })
    })
})

// get orders (should be 2)
describe("GET / api", () => {
    describe("Get orders", ()=>{
        test("Should be 2", async () => {
            const response = await request(app).get("/api")
            assert.equal(response.statusCode, 200)
            assert.equal(response.body.orders.length, 2)
        })
    })
})

/* invalids */
// Not valid product id
describe("POST / api", () => {
    describe("Add product to Card", ()=>{
        test("Product cannot be added", async () => {
            const response = await request(app).post("/api").send({...elon, "product_id": "abc"})
            assert.equal(response.statusCode, 400)
        })
    })
})

// Not valid product id 2
describe("POST / api", () => {
    describe("Add product to Card", ()=>{
        test("Product cannot be added", async () => {
            const response = await request(app).post("/api").send({...elon, "product_id": "-- \" $find ;'"})
            assert.equal(response.statusCode, 400)
        })
    })
})

/* security */
describe("POST / api", () => {
    describe("NoSQL operator injection", ()=>{
        test("Query operators in user fields are rejected", async () => {
            const response = await request(app).post("/api").send({
                "first_name": {"$ne": null},
                "last_name": {"$ne": null},
                "phone_number": {"$ne": null},
                "product_id": 2345,
            })
            assert.equal(response.statusCode, 400)
            assert.equal(response.body.message, "The request data is invalid or not clean")
        })

        test("Query operators in product_id are rejected", async () => {
            const response = await request(app).post("/api/products").send({"product_id": {"$gt": 0}})
            assert.equal(response.statusCode, 400)
        })

        test("Mongoose sanitizeFilter neutralises operators that bypass validation", async () => {
            await assert.rejects(Product.findOne({product_id: {"$gt": 0}}), mongoose.Error.CastError)
        })
    })

    describe("Error responses", ()=>{
        test("Malformed JSON returns a JSON 400 without a stack trace", async () => {
            const response = await request(app).post("/api")
                .set("Content-Type", "application/json")
                .send('{"first_name": ')
            assert.equal(response.statusCode, 400)
            assert.deepEqual(response.body, {message: "The request data is invalid or not clean"})
            assert.doesNotMatch(response.text, /SyntaxError|node_modules/)
        })

        test("Missing fields are rejected", async () => {
            const response = await request(app).post("/api").send({"first_name": "Elon"})
            assert.equal(response.statusCode, 400)
        })

        test("Rejected orders are never saved", async () => {
            assert.equal(await Order.countDocuments(), 2)
        })
    })
})
