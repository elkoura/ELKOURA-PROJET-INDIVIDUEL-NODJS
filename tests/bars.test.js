const request = require("supertest");
const app = require("../index");
const db = require("../config/database");

describe("/bars - CRUD endpoints", () => {
  let bar = {};

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

  test("POST // It should create a new bar", (done) => {
    const uniqueString = Math.random().toString(36).substring(7);
    const name = `test -${uniqueString}`;
    request(app)
      .post("/bars")
      .send({
        name: name,
        adresse: "888 Main Street",
        tel: "555-1234",
        description: "A great place to have a drink",
        email: "test@example.com",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            name: name,
            adresse: "888 Main Street",
            tel: "555-1234",
            description: "A great place to have a drink",
            email: "test@example.com",
          }),
        );
        bar = response.body;
        done();
      });
  });

  test("PUT // It should update a bar", (done) => {
    const { id, name, adresse, tel, description, email } = bar;
    const nameChange = `${name} - changed`;
    request(app)
      .put(`/bars/${id}`)
      .send({
        name: nameChange,
      })
      .set("Accept", "application/json")
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            name: nameChange,
          }),
        );
        bar = response.body;
        done();
      });
  });

  test("GET // It should get the newly created and edited Bar", (done) => {
    const { id } = bar;
    request(app)
      .get(`/bars/${id}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(bar);
        done();
      });
  });

  test("DELETE // It should delete a bar", (done) => {
    const { id } = bar;
    request(app)
      .delete(`/bars/${id}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: "Bar deleted successfully",
          }),
        );
        done();
      });
  });

  test("GET // It should return a list of bars", (done) => {
    request(app)
      .get("/bars")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              adresse: expect.any(String),
              tel: expect.any(String),
              email: expect.any(String),
              description: expect.any(String),
              updatedAt: expect.any(String),
              createdAt: expect.any(String),
            }),
          ]),
        );
        done();
      });
  });
});
