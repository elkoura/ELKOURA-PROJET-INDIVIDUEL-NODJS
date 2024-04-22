const express = require("express");
const router = express.Router();
const biereController = require("../controller/biereController");

const { validateBiere, validateIdParam, updateValidateBiere } = require("../validators/biereValidator");

router.post("/:id_bar/biere", validateBiere(), biereController.createBiere);
router.put("/biere/:id_biere", updateValidateBiere(), biereController.updateBiere);
router.delete("/biere/:id_biere", validateIdParam(), biereController.deleteBiere);
router.get("/:id_bar/biere", validateIdParam(), biereController.listBieres);
router.get("/biere/:id_biere", validateIdParam(), biereController.getBiere);

module.exports = router;
