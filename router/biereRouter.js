const express = require("express");
const router = express.Router();
const biereController = require("../controller/BiereController");

const { validateBiere, validateIdParam, updateValidateBiere } = require("../validators/biereValidator");
const errorValidator = require("../validators/errorValidator");

router.post("/bar/:id_bar/biere", [...validateBiere, errorValidator], biereController.createBiere);
router.put("/:id_biere", [updateValidateBiere, errorValidator], biereController.updateBiere);
router.get("/:id_biere", validateIdParam, biereController.getBiere);
router.delete("/:id_biere", validateIdParam, biereController.deleteBiere);
router.get("/bar/:id_bar/biere", validateIdParam, biereController.listBieres);

module.exports = router;
