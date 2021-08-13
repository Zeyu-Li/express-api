const request = require("supertest")
const app = require("./index")

describe("GET / api", () => {
    describe("Get orders", ()=>{
        test("Should be empty", async () => {
            const response = await request(app).get("/api")
            expect(response.statusCode).toBe(200)
        })
    })
})

describe("GET / api", () => {
    describe("Get orders", ()=>{
        test("Should have a few responses", async () => {
            const response = await request(app).get("/api")
            expect(response.statusCode).toBe(200)
        })
    })
})
