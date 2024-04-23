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


// les routes pour (1,2,3) bounus 1
router.get('/bars/:id_bar/degree', controller.getAverageDegreeWithPriceRange);
router.get('/bars/:id_bar/degreeByDate', controller.getAverageDegreeByDate);
router.get('/bars/:id_bar/ordersByDateAndPrice', controller.getOrdersByDateAndPriceRange);
router.get('/:id_bar/commandes', controller.getFilteredOrders);


module.exports = router;
