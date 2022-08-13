const request =  require("supertest");
require('dotenv').config();

const API =  process.env.API_URL;

describe("GET /users", () => {

    it("should return a string", async () => {
        const response = await request(API).get("/users");
        console.log (response)
        expect(response.body.data).toBe("GET ALL USERS TEST");
    })
})