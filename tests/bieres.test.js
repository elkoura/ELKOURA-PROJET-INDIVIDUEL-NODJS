const request = require("supertest");
const app = require("../index");
const db = require("../config/database");
const Biere = require("../models/Bieres");
const BiereCommande = require("../models/BiereCommandes");

describe("/bieres - CRUD endpoints", () => {
    let biere = {};
    let transaction;

    async function createTestBiere(transaction) {
        const testBiere = {
            name: "testing biere",
            degree: 1.5,
            prix: 50,
            description: "test",
            bars_id: 2
        }
        biere = await Biere.create(testBiere, { transaction })
        return biere;
    }

    beforeAll(async () => {
        try {
            db.authenticate();
            return;
        } catch (error) {
            console.error("Unable to connect to the database:", error);
        }
    });

    beforeEach(async () => {
        try {
            transaction = await db.transaction();
        } catch (error) {
            await transaction.rollback();
            console.error("Unable to connect to the database:", error);
        }
    });

    afterEach(async () => {
        try {
            if (transaction.finished !== 'rollback') {
                await transaction.rollback();
            }
        } catch (error) {
            console.error("Unable to rollback the transaction:", error);
        }
    });

    afterAll(async () => {
        try {
            await db.close();
        } catch (error) {
            console.error("Unable to close the database connection:", error);
        }
    });

    test("POST // It should create a new bar", (done) => {
        const uniqueString = Math.random().toString(36).substring(7);
        const newBar = {
            name: uniqueString,
            description: "test",
            degree: 1.5,
            prix: 50,
        }

        request(app)
            .post("/bieres/bar/2/biere")
            .send(newBar)
            .set("Accept", "application/json")
            .expect("Content-Type", "application/json; charset=utf-8")
            .expect(201)
            .then((response) => {
                expect(response.body).toEqual(expect.objectContaining(newBar));
                done();
            }).catch((error) => {
                console.log("error", error);
                done(error);
            });
    });

    test("GET // It should get the newly created and edited Biere", (done) => {
        new Promise(async (resolve, reject) => {
            const b = await createTestBiere(transaction);
            transaction.commit();

            if (!b) {
                reject("Error creating test data.", biere);
            }

            resolve(b);

        }).then(biere => {
            request(app)
                .get(`/bieres/${biere.id}`)
                .expect("Content-Type", "application/json; charset=utf-8")
                .expect(200)
                .then((response) => {
                    const responseBeer = response.body;
                    responseBeer.updatedAt = new Date(responseBeer.updatedAt);
                    responseBeer.createdAt = new Date(responseBeer.updatedAt);

                    expect(responseBeer).toEqual(expect.objectContaining(biere.dataValues));
                    done();
                }).catch((error) => {
                    console.log("error", error);
                    done(error);
                });
        });
    });

    test("PUT // It should update a bar", (done) => {
        const editedBiereModel = {
            id: biere.id,
            name: `${biere.name}_edited`,
            description: `${biere.description}_edited`,
            degree: biere.degree + 1,
            prix: biere.prix + 10,
            bars_id: biere.bars_id,
            updatedAt: expect.any(String),
        };

        request(app)
            .put(`/bieres/${biere.id}`)
            .send(editedBiereModel)
            .set("Accept", "application/json")
            .expect("Content-Type", "application/json; charset=utf-8")
            .expect(200)
            .then((response) => {
                expect(response.body.beer).toEqual(expect.objectContaining(editedBiereModel));
                done();
            }).catch((error) => {
                console.log("error", error);
                done(error);
            });
    });

    // test.only("DELETE // It should delete a biere", (done) => {
    //     new Promise(async (resolve, reject) => {
    //         const b = await createTestBiere(transaction);
    //         const o = BiereCommande.create({ biere_id: b.id, commande_id: 2 }, { transaction });

    //         if (!b || !o) {
    //             reject("Error creating test data.", b, o);
    //         }
    //         resolve(b);
    //     }).then(b => {
    //         request(app)
    //             .delete(`/bieres/${b.id}`)
    //             .expect("Content-Type", "application/json; charset=utf-8")
    //             // .expect(200)
    //             .then((response) => {
    //                 expect(response.body).toEqual({ message: expect.any(String) });
    //                 done();
    //             }).catch((error) => {
    //                 console.log("error", error);
    //                 done(error);
    //             });
    //     });

    // });

    // test("GET // It should return a list of beers", (done) => {

    //     const beerListShape = {
    //         id: 2,
    //         name: expect.any(String),
    //         adresse: expect.any(String),
    //         tel: expect.any(String),
    //         email: expect.any(String),
    //         description: expect.any(String),
    //         updatedAt: expect.any(String),
    //         createdAt: expect.any(String)
    //     }

    //     request(app)
    //         .get("/bieres/bars/:id_bar/biere")
    //         .expect(200)
    //         .then((response) => {
    //             expect(response.body).toEqual(
    //                 expect.arrayContaining([
    //                     expect.objectContaining(beerListShape),
    //                 ]),
    //             );
    //             done();
    //         });
    // });
});
