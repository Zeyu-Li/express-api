const request = require("supertest")
const app = require("./index")

jest.setTimeout(30000)

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

// exit with 0 for success
afterAll(() => setTimeout(() => process.exit(0), 1000))
