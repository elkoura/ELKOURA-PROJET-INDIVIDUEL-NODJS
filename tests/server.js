const request = require("supertest");
const app = require("../index");
const db = require("../config/database");


describe("GET / - index route", () => {
    beforeAll(async () => {
        try {
            await db.authenticate();
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    });

    afterAll(async () => {
        try {
            await db.close();
        } catch (error) {
            console.error('Unable to close the database connection:', error);
        }
    });

    test("It should return hello world", (done) => {

        request(app)
            .get("/")
            .expect(200)
            .then(response => {
                expect(response.body).toEqual(expect.objectContaining({
                    "message": "Hello World!"
                }));
                done();
            });
    })
});

