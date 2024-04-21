const sequelize = require("sequelize");
const db = require("../config/database");

const Bars = db.define("bars", {
  name: {
    type: sequelize.STRING,
    unique: true,
  },
  adresse: {
    type: sequelize.STRING,
  },
  tel: {
    type: sequelize.STRING,
  },
  email: {
    type: sequelize.STRING,
  },
  description: {
    type: sequelize.TEXT,
  },
});

module.exports = Bars;
