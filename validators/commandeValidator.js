const { body, validationResult } = require("express-validator");

const BiereCommandes = require("../models/biereCommandes");
const Bieres = require("../models/Bieres");
const Commandes = require("../models/Commandes");
const Bars = require("../models/Bars");
const Commande = require("../models/Commandes");

function createValidationRules() {
    return [
        body("name").notEmpty().bail().withMessage("le nom est requis"),
        body("prix")
            .notEmpty()
            .bail()
            .withMessage("le prix est obligatoire")
            .isFloat({ gt: 0 })
            .bail()
            .withMessage("le prix doit être un nombre positif"),
        body("status")
            .optional()
            .isIn(["en cours", "terminé"])
            .bail()
            .withMessage("le status doit être en cours ou terminé"),
        body("date").optional().isDate().bail().withMessage("la date doit être une date valide"),
        // middleware field validation
        function (req, res, next) {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            Bars.findByPk(req.params.id_bar)
                .then(() => {
                    next();
                })
                .catch((err) =>
                    res.status(404).json({ message: `Le bar avec l'id: '${req.params.id_bar}' n'exist pas.` })
                );
        }
    ];
}

function updateValidationRules() {
    return [
        body("name").optional({ nullable: true }),
        body("prix")
            .optional({ nullable: true })
            .isFloat({ gt: 0 })
            .bail()
            .withMessage("le prix doit être un nombre positif"),
        body("status")
            .optional({ nullable: true })
            .isIn(["en cours", "terminé"])
            .bail()
            .withMessage("le status doit être en cours ou terminé"),
        // middleware field validation
        function (req, res, next) {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            Commandes.findByPk(parseInt(req.params.id_commande))
                .then((commande) => {

                    if(commande.status === "terminé"){
                        return res.status(409).json({message: "Impossible de modifier la commande, elle est déjà terminée"});
                    } else {
                        next()
                    }

                })
                .catch((err) =>
                    res
                        .status(404)
                        .json({ err, message: `La commande avec l'id: '${req.params.id_commande}' n'exist pas.` })
                );
        }
    ];
}

function deleteValidation() {
    return [
        function (req, res, next) {
            Commandes.findByPk(parseInt(req.params.id_commande))
                .then((model) => {
                    if (!model)
                        return res
                            .status(404)
                            .json({ message: `La commande avec l'id: '${req.params.id_commande}' n'exist pas.` });

                    next();
                })
                .catch((err) => res.status(500).json({ err }));
        }
    ];
}

module.exports = { createValidationRules, updateValidationRules, deleteValidation };
