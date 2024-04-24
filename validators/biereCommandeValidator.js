const { body } = require("express-validator");


const createOrDeleteValidationRules =
    [
        body("biere_id")
            .notEmpty()
            .bail()
            .withMessage("L'ID de la bière est requis.")
            .isInt()
            .bail()
            .withMessage("L'ID de la bière doit être un entier."),
        body("commande_id")
            .notEmpty()
            .bail()
            .withMessage("L'ID de la commande est requis.")
            .isInt()
            .bail()
            .withMessage("L'ID de la commande est requis et doit être un entier.")
    ];


module.exports = {
    createOrDeleteValidationRules
};
