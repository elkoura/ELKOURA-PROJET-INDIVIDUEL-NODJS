
const Bars = require("../models/Bars");
const Bieres = require("../models/Bieres");
const Commandes = require("../models/Commandes");
const BiereCommandes = require("../models/BiereCommandes");


// - POST /commandes/:commande_id/biere/:biere_id => Ajouter une biere à une commande
// - DELETE /commandes/:id/biere/:id => Supprimer une biere d'une commande

const BiereCommandesController = {
    getAll: async (req, res) => {
        const bieresCommandes = await BiereCommandes.findAll();
        return res.status(200).json(bieresCommandes);
    },
    create: async (req, res) => {
        console.log({ ...req.params })
        try {
            const { biere_id, commande_id } = req.params;
            const biereCommande = await BiereCommandes.create({ biere_id, commande_id })
            return res.status(201).json(biereCommande);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const { biere_id, commande_id } = req.params;
            await BiereCommandes.destroy({
                where: { biere_id, commande_id }
            });
            return res.status(200).json({ message: 'Bière supprimée de la commande' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
};

module.exports = BiereCommandesController;
