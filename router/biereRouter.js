const express = require("express");
const router = express.Router();
const biereController = require("../controller/biereController");

router.post("/:id_bar/biere", biereController.createBiere);
router.put("/biere/:id_biere", biereController.updateBiere);
router.delete("/biere/:id_biere", biereController.deleteBiere);
router.get("/:id_bar/biere", biereController.listBieres);
router.get("/biere/:id_biere", biereController.getBiere);

module.exports = router;
