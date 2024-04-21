const sequelize = require("sequelize").Sequelize;

const db = new sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
  logging: false,
});

module.exports = db;
