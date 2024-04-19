const express = require("express");
const db = require("./config/database");
const app = express();
require("dotenv").config();
const barsRouter = require("./router/barsRouter");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const showAllTables = async () => {
  db.getQueryInterface()
    .showAllTables()
    .then((tables) => {
      console.log(`Tables created: ${tables}`); // This will print an array of table names
    });
};

const initDB = () => {
  db.sync()
    .then(async () => {
      await showAllTables();
    })
    .catch((err) => {
      console.log(err);
    });
};

initDB();

app.listen(process.env.SERVER_PORT, () => {
  console.log("App running on port " + process.env.SERVER_PORT);
});

app.use("/bars", barsRouter);
