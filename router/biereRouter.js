const express = require("express");
const router = express.Router();
const biereController = require("../controller/biereController");
const { validateCreation, validateIdBiere } = require("../validators/biereValidator");

router.post("/:id_bar/biere", validateCreation(), biereController.createBiere);
router.put("/biere/:id_biere", validateIdBiere(), biereController.updateBiere);
router.delete("/biere/:id_biere", validateIdBiere(), biereController.deleteBiere);
router.get("/:id_bar/biere", validateIdBiere(), biereController.listBieres);
router.get("/biere/:id_biere", validateIdBiere(), biereController.getBiere);

module.exports = router;
