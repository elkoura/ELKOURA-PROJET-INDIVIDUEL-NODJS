const Biere = require("../models/Biere");

const biereController = {
    // Create a new beer
    createBiere: async (req, res) => {
        try {
            const newBiere = {
                name: req.body.name,
                type: req.body.type,
                price: req.body.price,
                description: req.body.description,
                bar_id: req.body.bar_id
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
            const updatedBiere = {
                name: req.body.name,
                type: req.body.type,
                price: req.body.price,
                description: req.body.description,
                bar_id: req.body.bar_id
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
            const deletedRows = await Biere.destroy({ where: { id: id_biere } });

            if (deletedRows === 0) {
                return res.status(404).json({ error: "Beer not found" });
            }

            res.status(200).json({ message: "Beer deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // List all beers from a specific bar
    listBieres: async (req, res) => {
        try {
            const { id_bar } = req.params;
            const bieres = await Biere.findAll({ where: { bar_id: id_bar } });
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
