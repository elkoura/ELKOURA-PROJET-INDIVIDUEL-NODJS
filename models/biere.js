// Importation des composants nécessaires de la bibliothèque sequelize.
const { Sequelize, DataTypes } = require('sequelize');
// Récupération de l'instance sequelize configurée dans le fichier `database.js`.
const sequelize = require('../config/database');

// Définition du modèle 'Biere' avec sequelize.define.
// Le premier argument est le nom du modèle, le deuxième est un objet définissant les champs et leurs types.
const Biere = sequelize.define('Biere', {
  // Définition du champ 'name'. Chaque bière aura un nom qui est une chaîne de caractères et ne peut pas être nul.
  name: {
    type: DataTypes.STRING, // Le type de données pour 'name' est une chaîne de caractères.
    allowNull: false // 'allowNull: false' indique que le champ 'name' est obligatoire.
  },
  // Définition du champ 'description'. Il s'agit d'un texte pouvant contenir plus de caractères qu'une STRING.
  description: {
    type: DataTypes.TEXT,
    allowNull: true // Ce champ peut être nul, ce qui signifie qu'il est optionnel.
  },
  // Définition du champ 'degree'. Il représente le degré d'alcool de la bière.
  degree: {
    type: DataTypes.FLOAT, // Le degré d'alcool est représenté par un nombre à virgule flottante.
    allowNull: true
  },
  // Définition du champ 'prix'. Il représente le prix de la bière et doit être supérieur ou égal à zéro.
  prix: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: { // 'validate' est utilisé pour définir des validations personnalisées.
      min: 0 // Le prix ne peut pas être négatif.
    }
  },
  // Définition de la clé étrangère 'bars_id' qui relie chaque bière à un bar.
  bars_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  // Les options du modèle peuvent être définies ici. Par exemple, vous pouvez désactiver les timestamps si vous n'en avez pas besoin.
});

// Exportation du modèle 'Biere' pour qu'il puisse être utilisé ailleurs dans le projet.
module.exports = Biere;
