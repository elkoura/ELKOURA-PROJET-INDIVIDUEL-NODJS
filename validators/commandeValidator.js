const { body, validationResult } = require("express-validator");

const BiereCommandes = require("../models/biereCommandes");
const Bieres = require("../models/Bieres");
const Commandes = require("../models/Commandes");
const Bars = require("../models/Bars");

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

module.exports = createValidationRules;
