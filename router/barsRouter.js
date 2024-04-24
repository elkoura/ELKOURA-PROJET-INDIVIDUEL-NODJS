const express = require("express");
const router = express.Router();
const controller = require("../controller/barsController");
const errorValidator = require("../validators/errorValidator");
const { validateCreateBar, validateIdParam, updateValidateBar } = require("../validators/barValidator");

//Basic Crud
router.post("/", [...validateCreateBar, errorValidator], controller.store);
router.put("/:id_bar", [...updateValidateBar, errorValidator], controller.update);
router.delete("/:id_bar", [...validateIdParam, errorValidator], controller.delete);
router.get("/:id_bar", [...validateIdParam, errorValidator], controller.getOne);

router.get("/", controller.getAll);

// Bonus
router.get("/:id_bar/degree", [...validateIdParam, errorValidator], controller.getAverageDegree);
router.get("/:id_bar/biere", [...validateIdParam, errorValidator], controller.getBeersWithQueryParams);
router.get("/:id_bar/commandes", [...validateIdParam, errorValidator], controller.orderQuery);


// les routes pour (1,2,3) bounus 1
router.get('/bars/:id_bar/degree', controller.getAverageDegreeWithPriceRange);
router.get('/bars/:id_bar/degreeByDate', controller.getAverageDegreeByDate);
router.get('/bars/:id_bar/ordersByDateAndPrice', controller.getOrdersByDateAndPriceRange);
router.get('/:id_bar/commandes', controller.getFilteredOrders);


module.exports = router;
