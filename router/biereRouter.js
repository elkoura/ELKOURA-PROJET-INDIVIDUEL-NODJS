const express = require("express");
const router = express.Router();
const biereController = require("../controller/BiereController");

const { validateBiere, validateIdParam, updateValidateBiere } = require("../validators/biereValidator");

router.post("/:id_bar/biere", validateBiere(), biereController.createBiere);
router.put("/biere/:id_biere", updateValidateBiere(), biereController.updateBiere);
router.delete("/biere/:id_biere", validateIdParam(), biereController.deleteBiere);
router.get("/:id_bar/biere", validateIdParam(), biereController.listBieres);
router.get("/biere/:id_biere", validateIdParam(), biereController.getBiere);


router.get("/:id_biere", validateIdParam(), biereController.getBiere);
router.get("/bar/:id_bar/biere", validateIdParam(), biereController.listBieres);
router.post("/bar/:id_bar/biere", validateBiere(), biereController.createBiere);
router.put("/:id_biere", updateValidateBiere(), biereController.updateBiere);
router.delete("/:id_biere", validateIdParam(), biereController.deleteBiere);


const errorValidator = require("../validators/errorValidator");

router.post("/bar/:id_bar/biere", [...validateBiere, errorValidator], biereController.createBiere);
router.put("/:id_biere", [...updateValidateBiere, errorValidator], biereController.updateBiere);
router.get("/:id_biere", [...validateIdParam, errorValidator], biereController.getBiere);
router.delete("/:id_biere", [...validateIdParam, errorValidator], biereController.deleteBiere);
router.get("/bar/:id_bar/biere", [...validateIdParam, errorValidator], biereController.listBieres);


const {
  validateBiere,
  validateIdParam,
  updateValidateBiere,
} = require("../validators/biereValidator");
const errorValidator = require("../validators/errorValidator");

router.post(
  "/bar/:bars_id/biere",
  [...validateBiere, errorValidator],
  biereController.createBiere,
);
router.put(
  "/:id_biere",
  [...updateValidateBiere, errorValidator],
  biereController.updateBiere,
);
router.get(
  "/:id_biere",
  [...validateIdParam, errorValidator],
  biereController.getBiere,
);
router.delete(
  "/:id_biere",
  [...validateIdParam, errorValidator],
  biereController.deleteBiere,
);
router.get(
  "/bar/:id_bar/biere",
  [...validateIdParam, errorValidator],
  biereController.listBieres,
);

module.exports = router;
