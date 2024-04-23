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
            .then((commandeModel) => {
                const { name, prix, status } = req.body;
                const model = commandeModel.dataValues;
                const commande = {
                    name: name ?? model.name,
                    prix: prix ?? model.prix,
                    status: status ?? model.status
                };

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
        // - GET / commande / details /: id_commande => renvoie un pdf de la commande
        const { id_commande } = req.params;

        Commande.findByPk(id_commande)
            .then((commande) => {
                const commandeData = commande.dataValues;
                const pdfDoc = new jsPDF();
                console.log(commandeData);
                const items = [];
                for (const key in commandeData) {
                    items.push(`${key}: ${commandeData[key]}`);
                }

                pdfDoc.text(items, 10, 10);
                res.setHeader("Content-Type", "application/pdf");
                res.setHeader("Content-Disposition", "attachment; filename=commande.pdf");
                res.send(Buffer.from(pdfDoc.output('arraybuffer'))); // Send the PDF data as a response
            })
            .catch((err) => res.status(500).json({ error: err.message }));
    }
};
//controller d'affichage des commandes
// controller.getAll = (req, res) => {
// 	//arguments de getAll():requete (req) et resultat (res)
// 	Commande.findAll().then((queryResult) => {
// 		// findAll() , then() = fonctions (req = findAll() 												,res=queryResult()
// 		res.render("index", { commandes: queryResult }); // render=fonction res
// 	});
// };

// //controller des creations de commande
// controller.create = (req, res) => {
// 	res.render("create");
// };

// //controller des mises a jour de commandes
// controller.edit = (req, res) => {
// 	Commande.findByPk(req.params.id).then((commande) => {
// 		res.render("edit", { commandes: commande });
// 	});
// };

// //controller d'affichage d'une commande
// controller.store = (req, res) => {
// 	const commande = {
// 		name: req.body.name,
// 		prix: req.body.prix,
// 		bars_id: req.body.bars_id,
// 		date: req.body.date,
// 		status: req.body.status
// 	};
// };

// console.log(commande);

// //creation d'une commande
// Commande.create(commande)
// 	.then((commande) => {
// 		res.redirect("/commandes");
// 	})
// 	.catch((error) => {
// 		res.send(error);
// 	});

// //controller de mise a jour
// controller.update = (req, res) => {
// 	const commande = {
// 		name: req.body.name,
// 		prix: parseFloat(req.body.prix),
// 		bars_id: req.body.bars_id,
// 		date: req.body.date,
// 		status: req.body.status
// 	};
// };

// //mise a jour d'une commande avec id
// Commande.update(commande, { where: { id: req.params.id } })
// 	.then((commande) => res.redirect("/commandes"))
// 	.catch((error) => {
// 		res.send(error);
// 	});

// //controller de suppression d'une commande
// controller.destroy = (req, res) => {
// 	commande.destroy({ where: { id: req.params.id } }).then(() => res.redirect("/commandes"));
// };

module.exports = CommandeController;
