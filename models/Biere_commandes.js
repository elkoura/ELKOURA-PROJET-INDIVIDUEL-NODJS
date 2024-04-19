const sequelize = require('sequelize');
const db = require('../config/database');
//
const Biere_commande = db.define('biere_commande',  {     
    biere_id: {         
        type: sequelize.INTEGER
         },
    commande_id: { 
        type: sequelize.INTEGER
          },
    });

module.exports = Biere_commande;