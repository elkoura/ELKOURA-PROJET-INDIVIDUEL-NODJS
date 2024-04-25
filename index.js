const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

// routers
const barsRouter = require("./router/barsRouter");
const BiereRouter = require("./router/biereRouter");
const CommandeRouter = require("./router/commandeRouter");
const BiereCommandesRouter = require("./router/biereCommandesRouter");


//Settings
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(cors());
app.use(bodyParser.json());


// API Routes
app.use(
  "/",
  express
    .Router()
    .get("/", (req, res) => res.json({ message: "Hello World!" })),
);
app.use("/bars", barsRouter);
app.use("/bieres", BiereRouter);
app.use("/commandes", CommandeRouter);
app.use("/bierecommandes", BiereCommandesRouter);

module.exports = app;
