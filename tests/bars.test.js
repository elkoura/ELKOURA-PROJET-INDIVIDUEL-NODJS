const request = require("supertest");
const app = require("../index");
const db = require("../config/database");
const Bar = require("../models/Bars");

function simplifyModel(instance) {
  const plain = instance.get ? instance.get({ plain: true }) : instance;

  delete plain.createdAt;
  delete plain.updatedAt;

  return plain;
}

describe("/bars - CRUD endpoints", () => {
  let bar = {};

  beforeAll(async () => {
    try {
      db.authenticate();
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  });

  beforeEach(async () => {
    const uniqueName = Math.random().toString(36).substring(7);
    try {
      transaction = await db.transaction();
      const testBar = {
        name: uniqueName,
        adresse: "888 Main Street",
        tel: "555-1234",
        description: "test",
        email: "test@gmail.com"
      }
      return bar = await Bar.create(testBar, transaction);

    }
    catch (error) {
      await transaction.rollback();
      console.error("Unable to connect to the database:", error);
    }
  });

  afterEach(async () => {
    try {
      await transaction.rollback();
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
    const name = `test -${uniqueString}`;

    const newBar = {
      name,
      adresse: "888 Main Street",
      tel: "555-1234",
      description: "A great place to have a drink",
      email: "test@example.com",
    }

    request(app)
      .post("/bars")
      .send(newBar)
      .set("Accept", "application/json")
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining(simplifyModel(newBar)),
        );
        done();
      });
  });

  test("PUT // It should update a bar", (done) => {
    const { id, name, adresse, tel, description, email } = bar;
    const editedBarModel = {
      id,
      name,
      adresse,
      tel,
      description,
      email
    }
    request(app)
      .put(`/bars/${id}`)
      .send(editedBarModel)
      .set("Accept", "application/json")
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining(simplifyModel(editedBarModel)),
        );
        done();
      });
  });

  test("GET // It should get the newly created and edited Bar", (done) => {
    const { id } = bar;
    request(app)
      .get(`/bars/${id}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(expect.objectContaining(simplifyModel(bar)));
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

    const barListShape = {
      id: expect.any(Number),
      name: expect.any(String),
      adresse: expect.any(String),
      tel: expect.any(String),
      email: expect.any(String),
      description: expect.any(String),
      updatedAt: expect.any(String),
      createdAt: expect.any(String)
    }

    request(app)
      .get("/bars")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining(barListShape),
          ]),
        );
        done();
      });
  });
});
