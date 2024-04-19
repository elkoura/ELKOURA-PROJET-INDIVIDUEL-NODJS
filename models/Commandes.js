const sequelize = require('sequelize');
const db = require('../config/database');

const Commande = db.define('commande',  {  
    id_commande: {
        type: sequelize.INTEGER, AutoIncrement:true
    }   ,
    name: {         
        type: sequelize.STRING
         },
    prix: { 
        type: sequelize.FLOAT , validate:{min:0},
          },
    bars_id :{
            type: sequelize.INTEGER,
            },
    date : {
            type: sequelize.DATE
            },
    status : {
            type: sequelize.STRING
             }//2 vals: (en cours, terminé)
         });
module.exports = Commande;