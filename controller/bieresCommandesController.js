const BiereCommandes = require("../models/biereCommandes");

const BiereCommandesController = {
    getAll: async (req, res) => {
        const bieresCommandes = await BiereCommandes.findAll();
        return res.status(200).json(bieresCommandes);
    },

    create: (req, res) => {
        const { biere_id, commande_id } = req.params;

        BiereCommandes.create({
            biere_id,
            commande_id
        })
            .then((biereCommande) => {
                return res.status(201).json(biereCommande);
            })
            .catch((err) => {
                res.status(500).json({
                    error: err
                });
            });
    },

    delete: (req, res) => {
        const { biere_id, commande_id } = req.params;

        BiereCommandes.destroy({
            where: {
                biere_id,
                commande_id
            }
        })
            .then((beerOrdersDeleted) => {
                let message = `vous avez suprimmer ${beerOrdersDeleted} commande.`;

                return res.status(200).json({
                    message
                });
            })
            .catch((err) =>
                res.status(500).json({
                    error: err.message
                })
            );
    }
};

module.exports = BiereCommandesController;
