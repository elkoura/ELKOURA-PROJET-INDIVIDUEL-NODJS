const request = require("supertest");
const app = require("../index");
const db = require("../config/database");

describe('/bieres - CRUD endpoints', () => {
    let biere = {};

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

    test("POST // It should create a new bar", (done) => {
        const uniqueString = Math.random().toString(36).substring(7);
        request(app)
            .post("/bieres/bar/2/biere")
            .send({
                "name": uniqueString,
                "description": "test",
                "degree": 1.50,
                "prix": 50,
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(201)
            .then(response => {
                expect(response.body).toEqual(expect.objectContaining({
                    "name": uniqueString,
                    "description": "test",
                    "degree": 1.50,
                    "prix": 50,
                }));
                biere = response.body;
                done();
            })
    });
});