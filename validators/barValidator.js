const { param, body } = require("express-validator");

const validateBarIdParam = [param("id").notEmpty().isNumeric()];

const validateBarBody = [
  body("name").notEmpty().isString().withMessage("Name must be a string"),
  body("adresse").notEmpty().isString().withMessage("Address must be a string"),
  body("tel").notEmpty().isString().withMessage("Telephone must be a string"),
  body("email").notEmpty().isString().isEmail().withMessage("Invalid email format"),
  body("description").optional({ nullable: true }).isString().withMessage("Description must be a string"),
];

module.exports = {
  validateBarIdParam,
  validateBarBody,
};
