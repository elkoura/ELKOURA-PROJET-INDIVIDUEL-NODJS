const { body, param } = require("express-validator");

const validateCommandeIdParam = [
    param("id_commande")
        .notEmpty()
        .bail()
        .withMessage("ID is required")
        .isInt()
        .bail()
        .withMessage("ID must be a number")
];

const createValidationRules = [
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
    body("date")
        .optional({ values: "null" })
        .isDate()
        .bail()
        .withMessage("la date doit être une date valide")
        .custom((value) => {
            return new Date(value) < new Date();
        })
        .bail()
        .withMessage("la date peut pas être dans le futur")
];

const updateValidationRules = [
    ...validateCommandeIdParam,
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
        .withMessage("le status doit être en cours ou terminé")
    // middleware field validation
];

module.exports = { createValidationRules, updateValidationRules, validateCommandeIdParam };
