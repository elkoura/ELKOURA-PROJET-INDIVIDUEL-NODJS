const express = require("express");
const biereController = require("../controllers/biereController");
const router = express.Router();

router.post("/:id_bar/biere", biereController.createBiere);
router.put("/biere/:id_biere", biereController.updateBiere);
router.delete("/biere/:id_biere", biereController.deleteBiere);
router.get("/:id_bar/biere", biereController.listBieres);
router.get("/biere/:id_biere", biereController.getBiere);

module.exports = router;
