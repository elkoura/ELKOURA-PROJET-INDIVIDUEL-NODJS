const { Op } = require("sequelize");
const Commande = require("../models/Commandes"); //pour utiliser la classe product
const { default: jsPDF } = require("jspdf");

const CommandeController = {
    index: (req, res) => {
        const { id_bar } = req.params;
        const { date, prix_min, prix_max } = req.query;

        let whereOptions = {
            bars_id: parseInt(id_bar)
        };

        if (date) {
            whereOptions.date = date;
        }

        if (prix_min || prix_max) {
            whereOptions.prix = {};
            if (prix_min) {
                whereOptions.prix[Op.gte] = prix_min;
            }
            if (prix_max) {
                whereOptions.prix[Op.lte] = prix_max;
            }
        }

        Commande.findAll({
            where: whereOptions
        })
            .then((commandes) => {
                const commandeArray = commandes.map((commande) => commande.dataValues);
                res.json(commandeArray);
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    },
    store: (req, res) => {
        const { id_bar } = req.params;

        const commande = {
            name: req.body.name,
            prix: req.body.prix,
            bars_id: parseInt(id_bar),
            date: req.body.date ?? new Date(),
            status: req.body.status ?? "en cours"
        };

        Commande.create(commande)
            .then((commande) => {
                res.status(201).json({ message: "commande envoyée", commande: commande });
            })
            .catch((error) => {
                res.status(500).json({ error: error.message });
            });
    },
    update: (req, res) => {
        const { id_commande } = req.params;

        Commande.findByPk(id_commande)
            .then((commande) => {
                if (!commande)
                    return res.json({
                        err,
                        message: `La commande avec l'id: '${req.params.id_commande}' n'exist pas.`
                    });

                if (commande.status === "terminé") {
                    return res
                        .status(409)
                        .json({ message: "Impossible de modifier la commande, elle est déjà terminée" });
                }

                const values = req.body;

                commande.update(values);

                return Commande.update(commande, { where: { id: id_commande } });
            })
            .then(() => {
                res.status(200).json({ message: "commande modifiée" });
            })
            .catch((err) => res.status(500).json({ error: err.message }));
    },
    details: (req, res) => {
        Commande.findByPk(req.params.id)
            .then((commande) => {
                res.json(commande);
            })
            .catch((err) => res.status(500).json({ error: err.message }));
    },
    delete: (req, res) => {
        const { id_commande } = req.params;
        Commande.destroy({ where: { id: id_commande } })
            .then(() => {
                return res.json({ message: "commande:" + " " + id_commande + " supprimée" });
            })
            .catch((err) => res.status(500).json({ error: err.message }));
    },
    pdf: (req, res) => {
        const { id_commande } = req.params;

        Commande.findByPk(id_commande)
            .then((commande) => {
                const commandeData = commande.dataValues;
                const pdfDoc = new jsPDF();
                const items = [];
                for (const key in commandeData) {
                    items.push(`${key}: ${commandeData[key]}`);
                }

                pdfDoc.text(items, 10, 10);
                res.setHeader("Content-Type", "application/pdf");
                res.setHeader("Content-Disposition", "attachment; filename=commande.pdf");
                res.send(Buffer.from(pdfDoc.output("arraybuffer"))); // Send the PDF data as a response
            })
            .catch((err) => res.status(500).json({ error: err.message }));
    }
};

module.exports = CommandeController;
