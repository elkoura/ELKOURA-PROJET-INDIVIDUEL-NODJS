const express = require("express");
const router = express.Router();
const controller = require("../controller/barsController");
const { validateBar, validateIdParam, updateValidateBar } = require("../validators/barValidator");

router.post("/", validateBar(), controller.store);
router.put("/:id_bar", updateValidateBar(), controller.update);
router.delete("/:id_bar", validateIdParam(), controller.delete);
router.get("/", controller.getAll);
router.get("/:id_bar", validateIdParam(), controller.getOne);
router.get("/:id_bar/degree", validateIdParam(), controller.getAverageDegree);



router.get("/:id_bar/biere", validateIdParam(), controller.getBeers);

module.exports = router;
