const express = require("express");
const app = express();
const bodyParser = require("body-parser");

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
app.use("/bars", barsRouter);
app.use("/bieres", BiereRouter);
app.use("/commandes", CommandeRouter);
app.use("/bierecommandes", BiereCommandesRouter);

module.exports = app;