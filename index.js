const express = require("express");
const db = require("./config/database");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

// routers
const barsRouter = require("./router/barsRouter");
const CommandeRouter = require("./router/commandeRouter");
const BiereCommandesRouter = require("./router/biereCommandesRouter");

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

app.use("/commande", CommandeRouter);
app.use("/bierecommande", BiereCommandesRouter);
