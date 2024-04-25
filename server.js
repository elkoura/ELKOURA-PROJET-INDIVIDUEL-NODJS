const app = require("./index");
const db = require("./config/database");
require("dotenv").config();

const initDB = () => {
  require("./models/associations");
  return db
    .sync()
    .then(() => {
      /*no op*/
    })
    .catch((err) => {
      console.log(err);
    });
};

initDB().then(() => {
  app.listen(process.env.SERVER_PORT, () => {
    db.sync();
    console.log("App running on port " + process.env.SERVER_PORT);
  });
});
