const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./config/database");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

// routers
const barsRouter = require("./router/barsRouter");
const BiereRouter = require("./router/biereRouter");
const CommandeRouter = require("./router/commandeRouter");
const BiereCommandesRouter = require("./router/biereCommandesRouter");

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(bodyParser.json());

const initDB = () => {
    db.sync().catch((err) => {
        console.log(err);
    });
};

initDB();

app.listen(process.env.SERVER_PORT, () => {
    console.log("App running on port " + process.env.SERVER_PORT);
});

app.use("/bars", barsRouter);
app.use("/bieres", BiereRouter)
app.use("/commande", CommandeRouter);
app.use("/bierecommande", BiereCommandesRouter);
