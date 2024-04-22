const express = require("express");
const router = express.Router();

const { validateBar, validateIdParam, updateValidateBar } = require("../validators/barValidator");

router.post("/", validateBar(), controller.store);
router.put("/:id_bar", updateValidateBar(), controller.update);
router.delete("/:id_bar", validateIdParam(), controller.delete);
router.get("/", controller.getAll);
router.get("/:id_bar", validateIdParam(), controller.getOne);

module.exports = router;
