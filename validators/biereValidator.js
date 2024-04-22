const { body, validationResult } = require("express-validator");
const Bieres = require("../models/Bieres");

const validateBiere = () => {
    return [
        body("name").notEmpty().isString().withMessage("Name doit etre un chaine de caractere"),
        body("description").notEmpty().isString().withMessage("description doit etre un chaine de caractere"),
        body("degree").notEmpty().isFloat({ gt: 0 }).withMessage("degree doit etre positif"),
        body("prix").notEmpty().isFloat({ gt: 0 }).withMessage("prix doit etre positif"),

        function (req, res, next) {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.send({ errors: errors.array() });
            }
            next();
        }
    ];
};

const validateIdParam = () => {
    return [
        function (req, res, next) {
            const id_biere = parseInt(req.params.id_biere);
            const id_bar = parseInt(req.params.id_bar);
            if ((id_biere && isNaN(id_biere)) || (id_bar && isNaN(id_bar))) {
                return res.status(400).send({ error: "ID must be a number" });
            }

            next();
        }
    ];
};

const updateValidateBiere = () => {
    return [
        body("name").optional({ nullable: true }),
        body("description").optional({ nullable: true }),
        body("degree").optional({ nullable: true }).isFloat({ min: 0 }).withMessage("Le degree doit être positif"),
        body("prix").optional({ nullable: true }).isFloat({ min: 0 }).withMessage("Le prix doit être positif"),

        function (req, res, next) {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            Bieres.findByPk(parseInt(req.params.id_biere))
                .then(() => {
                    next();
                })
                .catch((err) =>
                    res.status(404).json({ err, message: `La biere avec l'id: '${req.params.id_bar}' n'existe pas.` })
                );
        }
    ];
};

module.exports = {
    validateBiere,
    validateIdParam,
    updateValidateBiere
};

// const { body } = require("express-validator");

// const createBiereValidationRules = () => {
//     return [
//         body("name").notEmpty().withMessage("Le nom de la bière est requis."),
//         body("prix").isFloat({ min: 0 }).withMessage("Le prix doit être positif."),
//         body("bars_id").isInt().withMessage("L'ID du bar est requis et doit être un entier.")
//     ];
// };

// const updateBiereValidationRules = () => {
//     return [
//         body("name").optional().isString().withMessage("Le nom de la bière doit être une chaîne de caractères."),
//         body("prix").optional().isFloat({ min: 0 }).withMessage("Le prix doit être positif.")
//     ];
// };

// module.exports = {
//     createBiereValidationRules,
//     updateBiereValidationRules
// };
