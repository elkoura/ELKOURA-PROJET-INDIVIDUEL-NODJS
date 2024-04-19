const express = require("express");
const app = express();
require("dotenv").config();
const barsRouter = require("./router/barsRouter");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(process.env.SERVER_PORT, () => {
  console.log("App running on port " + process.env.SERVER_PORT);
});

app.use("/bars", barsRouter);
