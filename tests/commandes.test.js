const request = require("supertest");
const app = require("../index");
const db = require("../config/database");

describe("/commandes - CRUD endpoints", () => {
    let commande = {};


    beforeAll(async () => {
        try {
            await db.authenticate();
            await db.sync();

        } catch (error) {
            console.error("Unable to connect to the database:", error);
        }
    });


    afterAll(async () => {
        try {
            await db.close();
        } catch (error) {
            console.error("Unable to close the database connection:", error);
        }
    });

    test("POST // It should create a new command", (done) => {
        const uniqueString = Math.random().toString(36).substring(7);
        request(app)
            .post("/commandes/bars/2/commandes")
            .send({
                name: uniqueString,
                prix: 5.5,
            })
            .set("Accept", "application/json")
            .expect("Content-Type", "application/json; charset=utf-8")
            .expect(201)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        name: uniqueString,
                        prix: 5.5,
                    })
                );
                commande = response.body;
                done();
            });
    });
});
