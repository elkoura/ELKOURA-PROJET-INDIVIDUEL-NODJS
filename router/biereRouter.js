const express = require("express");
const router = express.Router();
const biereController = require("../controller/BiereController");

const { validateBiere, validateIdParam, updateValidateBiere } = require("../validators/biereValidator");

router.get("/:id_biere", validateIdParam(), biereController.getBiere);
router.get("/bar/:id_bar/biere", validateIdParam(), biereController.listBieres);
router.post("/bar/:id_bar/biere", validateBiere(), biereController.createBiere);
router.put("/:id_biere", updateValidateBiere(), biereController.updateBiere);
router.delete("/:id_biere", validateIdParam(), biereController.deleteBiere);

module.exports = router;
