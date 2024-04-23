const express = require("express");
const router = express.Router();
const controller = require("../controller/barsController");
const validator = require("../validators/errorValidator");
const { validateCreateBar, validateIdParam, updateValidateBar } = require("../validators/barValidator");

//Basic Crud
router.post("/", [...validateCreateBar, validator], controller.store);
router.put("/:id_bar", [...updateValidateBar, validator], controller.update);
router.delete("/:id_bar", validateIdParam, controller.delete);
router.get("/:id_bar", validateIdParam, controller.getOne);

router.get("/", controller.getAll);

// Bonus
router.get("/:id_bar/degree", validateIdParam, controller.getAverageDegree);
router.get("/:id_bar/biere", validateIdParam, controller.getBeersWithQueryParams);
router.get("/:id_bar/commandes", validateIdParam, controller.orderQuery);

module.exports = router;
