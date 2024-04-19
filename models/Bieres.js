
const sequelize = require("sequelize");
const db = require("../config/database");


const Biere = db.define(
  "bieres",
  {
    name: {
      type: sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: sequelize.TEXT,
      allowNull: true,
    },
    degree: {
      type: sequelize.FLOAT,
      allowNull: true,
    },
    prix: {
      type: sequelize.FLOAT,
      allowNull: false,
      validate: {
        min: 0, // Le prix ne peut pas être négatif.
      },
    },
    bars_id: {
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'bars',
      },
    },
  }
);

module.exports = Biere;
