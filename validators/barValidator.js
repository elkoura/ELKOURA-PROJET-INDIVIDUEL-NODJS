const { body, validationResult, param } = require("express-validator");
const Bars = require("../models/Bars");

const validateIdParam = [
    param("id_bar").notEmpty().bail().withMessage("ID is required").isInt().bail().withMessage("ID must be a number")
];

const validateCreateBar = [
    body("name").notEmpty().isString().withMessage("Name must be a string"),
    body("adresse").notEmpty().isString().withMessage("Address must be a string"),
    body("tel").notEmpty().isString().withMessage("Telephone must be a string"),
    body("email").notEmpty().isString().isEmail().withMessage("Invalid email format"),
    body("description").optional({ nullable: true }).isString().withMessage("Description must be a string")
];

const updateValidateBar = [
    ...validateIdParam,
    body("name").optional({ nullable: true }),
    body("adresse").optional({ nullable: true }),
    body("tel").optional({ nullable: true }),
    body("email").optional({ nullable: true }).isEmail().withMessage("Invalid email format"),
    body("description").optional({ nullable: true })
];

module.exports = { validateCreateBar, validateIdParam, updateValidateBar };
