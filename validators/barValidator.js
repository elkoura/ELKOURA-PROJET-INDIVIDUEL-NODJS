const { body, validationResult } = require("express-validator");
const Bars = require("../models/Bars");

const validateBar = () => {
  return [
    body("name").notEmpty().isString().withMessage("Name must be a string"),
    body("adresse").notEmpty().isString().withMessage("Address must be a string"),
    body("tel").notEmpty().isString().withMessage("Telephone must be a string"),
    body("email").notEmpty().isString().isEmail().withMessage("Invalid email format"),
    body("description").optional({ nullable: true }).isString().withMessage("Description must be a string"),

    function (req, res, next) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.send({ errors: errors.array() });
      }
      next();
    },
  ];
};

const validateIdParam = () => {
  return [
    function (req, res, next) {
      const id_bar = parseInt(req.params.id_bar);
      if (isNaN(id_bar)) {
        return res.status(400).send({ error: "ID must be a number" });
      }

      next();
    },
  ];
};

const updateValidateBar = () => {
  return [
    body("name").optional({ nullable: true }),
    body("adresse").optional({ nullable: true }),
    body("tel").optional({ nullable: true }),
    body("email").optional({ nullable: true }).isEmail().withMessage("Invalid email format"),
    body("description").optional({ nullable: true }),

    function (req, res, next) {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      Bars.findByPk(parseInt(req.params.id_bar))
        .then(() => {
          next();
        })
        .catch((err) => res.status(404).json({ err, message: `Le bar avec l'id: '${req.params.id_bar}' n'existe pas.` }));
    },
  ];
};

module.exports = {
  validateBar,
  validateIdParam,
  updateValidateBar,
};
