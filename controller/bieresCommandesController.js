
const Bars = require("../models/Bars");
const Bieres = require("../models/Bieres");
const Commandes = require("../models/Commandes");
const BiereCommandes = require("../models/biereCommandes");


// - POST /commandes/:commande_id/biere/:biere_id => Ajouter une biere à une commande
// - DELETE /commandes/:id/biere/:id => Supprimer une biere d'une commande

const BiereCommandesController = {
    getAll: async (req, res) => {
        const bieresCommandes = await BiereCommandes.findAll();
        return res.status(200).json(bieresCommandes);
    },
    create: async (req, res) => {
        const { biere_id, commande_id } = req.params;
        if (!biere_id || !commande_id) return res.status(400).json({ error: 'Toutes les champs sont obligatoire' })

        BiereCommandes.create({ biere_id, commande_id })
            .then((biereCommande) => {
                return res.status(201).json(biereCommande);
            })
            .catch((err) => res.status(500).json({ error: err }));

    },
    delete: async (req, res) => {
        const { biere_id, commande_id } = req.params;

        if (!biere_id || !commande_id) return res.status(400).json({ error: 'Toutes les champs sont obligatoire' });

        BiereCommandes.destroy({ where: { biere_id, commande_id } })
            .then(() => {
                return res.status(200).json({ message: 'Bière supprimée de la commande' });
            })
            .catch((err) =>
                res.status(500).json({ error: err.message })
            );

    }
};

module.exports = BiereCommandesController;
