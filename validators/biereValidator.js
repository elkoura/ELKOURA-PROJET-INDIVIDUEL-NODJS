const { body } = require("express-validator");

const createBiereValidationRules = () => {
    return [
        body("name").notEmpty().withMessage("Le nom de la bière est requis."),
        body("prix").isFloat({ min: 0 }).withMessage("Le prix doit être positif."),
        body("bars_id").isInt().withMessage("L'ID du bar est requis et doit être un entier.")
    ];
};

const updateBiereValidationRules = () => {
    return [
        body("name").optional().isString().withMessage("Le nom de la bière doit être une chaîne de caractères."),
        body("prix").optional().isFloat({ min: 0 }).withMessage("Le prix doit être positif.")
    ];
};

module.exports = {
    createBiereValidationRules,
    updateBiereValidationRules
};
