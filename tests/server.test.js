const request = require("supertest");
const app = require("../index");
const db = require("../config/database");

beforeAll(async () => {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});

afterAll(async () => {
    try {
        await db.close();
        console.log('Connection has been closed successfully.')
    } catch (error) {
        console.error('Unable to close the database connection:', error);
    }
});

// describe("Test the root path", () => {
//     test("It should response the GET method", done => {
//         request(app)
//             .get("/")
//             .then(response => {
//                 expect(response.statusCode).toBe(200);
//                 done();
//             });
//     });
// });

describe("POST /bars - Creating a new Bar", () => {
    test("It should create a new bar and return it", (done) => {

        const uniqueSuffix = Math.random().toString(36).substr(2, 5); // generates a random 5-character string
        const barName = `kieran's bar ${uniqueSuffix}`;
        request(app)
            .post("/bars")
            .send({
                "name": barName,
                "adresse": "888 Main Street",
                "tel": "555-1234",
                "description": "A great place to have a drink",
                "email": "bob-bar@example.com"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .then(response => {
                expect(response.body).toEqual(expect.objectContaining({
                    "name": barName,
                    "adresse": "888 Main Street",
                    "tel": "555-1234",
                    "email": "bob-bar@example.com",
                    "description": "A great place to have a drink",
                }));
                done();
            });
    })
});

describe("POST /bars - Can't create an existing bar (name must be unique)", () => {
    test("It should not create a new bar and a 409 status code", (done) => {

        const name = 'Bob Bar';
        request(app)
            .post("/bars")
            .send({
                "name": name,
                "adresse": "888 Main Street",
                "tel": "555-1234",
                "description": "A great place to have a drink",
                "email": "bob-bar@example.com"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(404, done)
    })
});
