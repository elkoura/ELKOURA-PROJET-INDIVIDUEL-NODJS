const express = require("express");
const db = require("./config/database");
const app = express();
require("dotenv").config();
const barsRouter = require("./router/barsRouter");
const biereCommandesRouter = require("./router/biereCommandesRouter");
const bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// const populateDB = async () => {
//   const sqlFilePath = path.resolve(__dirname, "config/populate.sql");

//   const rawSql = fs.readFileSync(sqlFilePath, "utf-8").toString();
//   return await db
//     .query(rawSql)
//     .then(() => {
//       console.log("Database populated");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

const initDB = () => {
  db.sync()
    .then(async () => {
      // await showAllTables();
      // return await populateDB();
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

app.use("/bierecommande", biereCommandesRouter);
