const sequelize = require("sequelize");

const db = new sequelize({
  dialect: "sqlite",
  storage: "db.sqlite",
});

module.exports = db
