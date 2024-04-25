const express = require("express");
const router = express.Router();
const biereController = require("../controller/BiereController");

const {
  validateBiere,
  validateIdParam,
  updateValidateBiere,
  validateBarsIdParam
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
  [...validateBarsIdParam, errorValidator],
  biereController.listBieres,
);

module.exports = router;
