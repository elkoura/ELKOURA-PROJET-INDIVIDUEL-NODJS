const Bars = require("./Bars");
const Bieres = require("./Bieres");
const Commandes = require("./Commandes");
const BiereCommandes = require("./BiereCommandes");

Bars.hasMany(Commandes, {
  foreignKey: "bars_id",
  onDelete: "cascade",
});

Bars.hasMany(Bieres, {
  foreignKey: "bars_id",
  onDelete: "cascade",
});

Bieres.belongsTo(Bars, { foreignKey: "bars_id" });
Commandes.belongsTo(Bars, { foreignKey: "bars_id" });

Commandes.belongsToMany(Bieres, {
  through: BiereCommandes,
  foreignKey: "commande_id",
});

Bieres.belongsToMany(Commandes, {
  through: BiereCommandes,
  foreignKey: "biere_id",
});
