const express = require("express");
const router = express.Router();
const controller = require("../controller/barsController");

const { validateBarIdParam, validateBarBody } = require("../validators/barValidator");
const validate = require("../validators/validator");

router.post("/", validateBarBody, validate, controller.store);
router.put("/:id_bar", validateBarIdParam, validateBarBody, validate, controller.update);
router.delete("/:id_bar", validateBarIdParam, validate, controller.delete);
router.get("/", controller.getAll);
router.get("/:id_bar", validateBarIdParam, validate, controller.getOne);

module.exports = router;
