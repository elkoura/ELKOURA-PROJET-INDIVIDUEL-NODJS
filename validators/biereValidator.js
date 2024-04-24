const { body, validationResult, param } = require("express-validator");
const Bieres = require("../models/Bieres");

const validateIdParam = [
    param("id_biere").notEmpty().bail().withMessage("ID is required").isInt().bail().withMessage("ID must be a number")
];

const validateBarsIdParam = [
    param("bars_id").notEmpty().bail().withMessage("ID is required")
        .isInt().bail().withMessage("ID must be a number")
];


const validateBiere = [
    ...validateBarsIdParam,
    body("name").notEmpty().isString().withMessage("Name doit etre un chaine de caractere"),
    body("description").notEmpty().isString().withMessage("description doit etre un chaine de caractere"),
    body("degree").notEmpty().isFloat({ gt: 0 }).withMessage("degree doit etre positif"),
    body("prix").notEmpty().isFloat({ gt: 0 }).withMessage("prix doit etre positif")
];

const updateValidateBiere = [
    body("name").optional({ nullable: true }),
    body("description").optional({ nullable: true }),
    body("degree").optional({ nullable: true }).isFloat({ min: 0 }).withMessage("Le degree doit être positif"),
    body("prix").optional({ nullable: true }).isFloat({ min: 0 }).withMessage("Le prix doit être positif")
];

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
