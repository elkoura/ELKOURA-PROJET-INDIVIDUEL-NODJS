const express = require("express");
const router = express.Router();
const controller = require("../controller/barsController");
const { validateBar, validateIdParam, updateValidateBar } = require("../validators/barValidator");

//Basic Crud
router.get("/", controller.getAll);
router.post("/", validateBar(), controller.store);
router.put("/:id_bar", updateValidateBar(), controller.update);
router.delete("/:id_bar", validateIdParam(), controller.delete);
router.get("/:id_bar", validateIdParam(), controller.getOne);

// Bonus
router.get("/:id_bar/degree", validateIdParam(), controller.getAverageDegree);
router.get("/:id_bar/biere", validateIdParam(), controller.getBeersWithQueryParams);



router.get("/:id_bar/biere", validateIdParam(), controller.getBeers);

module.exports = router;
