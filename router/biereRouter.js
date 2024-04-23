const express = require("express");
const router = express.Router();
const biereController = require("../controller/BiereController");
const { validateCreation, validateIdBiere } = require("../validators/biereValidator");

<<<<<<< HEAD
router.post("/:id_bar/biere", validateCreation(), biereController.createBiere);
router.put("/biere/:id_biere", validateIdBiere(), biereController.updateBiere);
router.delete("/biere/:id_biere", validateIdBiere(), biereController.deleteBiere);
router.get("/:id_bar/biere", validateIdBiere(), biereController.listBieres);
router.get("/biere/:id_biere", validateIdBiere(), biereController.getBiere);
=======
const { validateBiere, validateIdParam, updateValidateBiere } = require("../validators/biereValidator");

router.post("/:id_bar/biere", validateBiere(), biereController.createBiere);
router.put("/biere/:id_biere", updateValidateBiere(), biereController.updateBiere);
router.delete("/biere/:id_biere", validateIdParam(), biereController.deleteBiere);
router.get("/:id_bar/biere", validateIdParam(), biereController.listBieres);
router.get("/biere/:id_biere", validateIdParam(), biereController.getBiere);
>>>>>>> edc4ae2320c7ff105ebecfe8fefb9d06f5052379

module.exports = router;
