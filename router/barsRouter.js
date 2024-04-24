const express = require("express");
const router = express.Router();
const controller = require("../controller/barsController");
const errorValidator = require("../validators/errorValidator");
const { validateCreateBar, validateIdParam, updateValidateBar } = require("../validators/barValidator");

router.get("/", controller.getAll);
//Basic Crud
router.post("/", [...validateCreateBar, errorValidator], controller.store);
router.put("/:id_bar", [...updateValidateBar, errorValidator], controller.update);
router.delete("/:id_bar", [...validateIdParam, errorValidator], controller.delete);
router.get("/:id_bar", [...validateIdParam, errorValidator], controller.getOne);


// Bonus
router.get("/:id_bar/degree", [...validateIdParam, errorValidator], controller.getAverageDegree);
router.get("/:id_bar/biere", [...validateIdParam, errorValidator], controller.getBeersWithQueryParams);
router.get("/:id_bar/commandes", [...validateIdParam, errorValidator], controller.orderQuery);

module.exports = router;
