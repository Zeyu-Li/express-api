const request = require("supertest")
const app = require("./index")

// set timeout to be 30 sec because github sometimes takes a while to cold boot
jest.setTimeout(30000)

// get orders (should be zero)
describe("GET / api", () => {
    describe("Get orders", ()=>{
        test("Should be empty", async () => {
            const response = await request(app).get("/api")
            expect(response.statusCode).toBe(200)
            expect(response.body.orders.length).toBe(0)
            // console.log(response.body.orders.length)
            
            // expect(response.body).toBe()
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
            expect(response.statusCode).toBe(200)
        })
    })
})

// add to cart
describe("POST / api", () => {
    describe("Add product to Card", ()=>{
        test("Product Added", async () => {
            const response = await await request(app).post("/api").send({
                "first_name": "Elon",
                "last_name": "Musk",
                "phone_number": "(123) 456-1234",
                "product_id": 2345
            })
            expect(response.statusCode).toBe(200)
        })
    })
})

// Bad Order (item does not exist)
describe("POST / api", () => {
    describe("Add product to Card", ()=>{
        test("Product Added", async () => {
            const response = await await request(app).post("/api").send({
                "first_name": "Elon",
                "last_name": "Musk",
                "phone_number": "(123) 456-1234",
                "product_id": 52345
            })
            expect(response.statusCode).toBe(200)
        })
    })
})

describe("GET / api", () => {
    describe("Get orders", ()=>{
        test("Should have a few responses", async () => {
            const response = await request(app).get("/api")
            expect(response.statusCode).toBe(200)
            expect(response.body.orders.length).toBe(1)
        })
    })
})

// post product again but should error since it is the same one
describe("POST / api", () => {
    describe("Add product", ()=>{
        test("Product Added", async () => {
            const response = await request(app).post("/api/products").send({
                "product_id": 2345
            })
            expect(response.statusCode).toBe(400)
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
            expect(response.statusCode).toBe(400)
        })
    })
})

// Order (item do exist now!)
describe("POST / api", () => {
    describe("Add product to Card", ()=>{
        test("Product Added", async () => {
            const response = await await request(app).post("/api").send({
                "first_name": "Elon",
                "last_name": "Musk",
                "phone_number": "(123) 456-1234",
                "product_id": 52345
            })
            expect(response.statusCode).toBe(200)
        })
    })
})

// get orders (should be 2)
describe("GET / api", () => {
    describe("Get orders", ()=>{
        test("Should be 2", async () => {
            const response = await request(app).get("/api")
            expect(response.statusCode).toBe(200)
            expect(response.body.orders.length).toBe(2)
        })
    })
})

/* invalids */
// Not valid product id
describe("POST / api", () => {
    describe("Add product to Card", ()=>{
        test("Product cannot be added", async () => {
            const response = await await request(app).post("/api").send({
                "first_name": "Elon",
                "last_name": "Musk",
                "phone_number": "(123) 456-1234",
                "product_id": "abc"
            })
            expect(response.statusCode).toBe(400)
        })
    })
})

// Not valid product id 2
describe("POST / api", () => {
    describe("Add product to Card", ()=>{
        test("Product cannot be added", async () => {
            const response = await await request(app).post("/api").send({
                "first_name": "Elon",
                "last_name": "Musk",
                "phone_number": "(123) 456-1234",
                "product_id": "-- \" $find ;'"
            })
            expect(response.statusCode).toBe(400)
        })
    })
})

// exit with 0 for success
afterAll(() => {
    setTimeout(() => process.exit(0), 1000)
})
