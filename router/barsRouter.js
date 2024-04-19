const express = require("express");
const router = express.Router();
const controller = require("../controller/barsController");

router.post("/", controller.store);
router.put("/:id_bar", controller.update);
router.delete("/:id_bar", controller.delete);
router.get("/", controller.getAll);
router.get("/:id_bar", controller.getOne);

module.exports = router;
