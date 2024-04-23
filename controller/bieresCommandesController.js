const BiereCommandes = require("../models/BiereCommandes");
const Bieres = require("../models/Bieres");
const Commandes = require("../models/Commandes");


const BiereCommandesController = {
    getAll: async (req, res) => {
        const bieresCommandes = await BiereCommandes.findAll();
        return res.status(200).json(bieresCommandes);
    },

    create: (req, res) => {
        const { biere_id, commande_id } = req.params;

        Promise.all([
            Bieres.findOne({
                where: {
                    id: biere_id
                }
            }),
            Commandes.findOne({
                where: {
                    id: commande_id
                }
            })
        ])
            .then(([biere, commande]) => {
                if (!biere || !commande) {
                    return res.status(404).json({
                        error: `La bière avec l'ID ${biere_id} ou la commande avec l'ID ${commande_id} n'existe pas.`
                    });
                }

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

            })
            .catch((err) => {
                return res.status(500).json({
                    error: err
                });
            });


    },

    delete: (req, res) => {
        const { biere_id, commande_id } = req.params;

        BiereCommandes.findOne({
            where: {
                biere_id,
                commande_id
            }
        })
            .then((biereCommande) => {
                if (!biereCommande) {
                    return res.status(404).json({
                        error: `La biere commande avec l'ID ${commande_id} et la bière avec l'ID ${biere_id} n'existe pas.`
                    });
                }

                biereCommande.destroy();
            })
            .catch((err) => {
                return res.status(500).json({
                    error: err
                });
            });
    }
};

module.exports = BiereCommandesController;
