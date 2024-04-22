const BiereCommande = require("../models/biereCommandes");
const Biere = require("../models/Bieres");
const Commande = require("../models/Commandes");

const biereController = {
    // Create a new beer
    createBiere: async (req, res) => {
        try {
            const newBiere = {
                name: req.body.name,
                type: req.body.type,
                prix: req.body.prix,
                description: req.body.description,
                bars_id: req.body.bars_id
            };

            const createdBiere = await Biere.create(newBiere);
            res.status(201).json(createdBiere);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update an existing beer
    updateBiere: async (req, res) => {
        try {
            const { id_biere } = req.params;

            const selectedBiere = await Biere.findByPk(id_biere);
            const updatedBiere = {
                name: req.body.name ?? selectedBiere.name,
                prix: req.body.prix ?? selectedBiere.prix,
                degree: req.body.degree ?? selectedBiere.degree,
                description: req.body.description ?? selectedBiere.description
            };

            await Biere.update(updatedBiere, { where: { id: id_biere } });
            res.status(200).json({ message: "Beer updated successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Delete a beer
    deleteBiere: async (req, res) => {
        try {
            const { id_biere } = req.params;

            // Find associated BiereCommande records
            const biereCommandes = await BiereCommande.findAll({ where: { biere_id: id_biere } });

            // Delete associated Commande records
            let commandeDestroyed;
            for (let biereCommande of biereCommandes) {
                commandeDestroyed += await Commande.destroy({ where: { id: biereCommande.commande_id } });
            }

            // Delete Biere
            const deletedBeers = await Biere.destroy({ where: { id: id_biere } });

            if (deletedBeers === 0) {
                return res.status(404).json({ error: "Beer not found" });
            }
            res.status(200).json({
                message: `${deletedBeers} beer(s) destroyed, along side with ${commandeDestroyed} order(s) `
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // List all beers from a specific bar
    listBieres: async (req, res) => {
        try {
            const { id_bar } = req.params;
            const bieres = await Biere.findAll({ where: { bars_id: id_bar } });
            res.status(200).json(bieres);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get details of a specific beer
    getBiere: async (req, res) => {
        try {
            const { id_biere } = req.params;
            const biere = await Biere.findByPk(id_biere);

            if (!biere) {
                return res.status(404).json({ error: "Beer not found" });
            }

            res.status(200).json(biere);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = biereController;
