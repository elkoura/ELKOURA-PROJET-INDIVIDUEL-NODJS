const sequelize = require("sequelize");
const db = require("../config/database");

const Commande = db.define('commande', {

        id_commande: {
                type: sequelize.INTEGER, primaryKey: true, autoIncrement: true
        },
        name: {
                type: sequelize.STRING
        },
        prix: {
                type: sequelize.FLOAT, validate: { min: 0 },
        },
        bars_id: {
                type: sequelize.INTEGER,
                allowNull: false,
                references: {
                        model: 'bars',
                },
        },
        date: {
                type: sequelize.DATE
        },
        status: {
                type: sequelize.STRING//, Sequelize.ENUM,values: ['en cours','terminé']
        }//2 vals: (en cours, terminé)
});
module.exports = Commande;