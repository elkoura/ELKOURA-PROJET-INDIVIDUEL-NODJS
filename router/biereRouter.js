const express = require("express");
const router = express.Router();
const biereController = require("../controller/BiereController");
<<<<<<< HEAD
const { validateBiere, validateIdParam, updateValidateBiere } = require("../validators/biereValidator");
<<<<<<< HEAD
<<<<<<< HEAD
router.post("/:id_bar/biere", validateBiere(), biereController.createBiere);
router.put("/biere/:id_biere", updateValidateBiere(), biereController.updateBiere);
router.delete("/biere/:id_biere", validateIdParam(), biereController.deleteBiere);
router.get("/:id_bar/biere", validateIdParam(), biereController.listBieres);
router.get("/biere/:id_biere", validateIdParam(), biereController.getBiere);
=======

router.get("/:id_biere", validateIdParam(), biereController.getBiere);
router.get("/bar/:id_bar/biere", validateIdParam(), biereController.listBieres);
router.post("/bar/:id_bar/biere", validateBiere(), biereController.createBiere);
router.put("/:id_biere", updateValidateBiere(), biereController.updateBiere);
router.delete("/:id_biere", validateIdParam(), biereController.deleteBiere);
>>>>>>> 8ab05574559039f5c2428f8db2c355e9cc679405
=======
const errorValidator = require("../validators/errorValidator");

router.post("/bar/:id_bar/biere", [...validateBiere, errorValidator], biereController.createBiere);
router.put("/:id_biere", [...updateValidateBiere, errorValidator], biereController.updateBiere);
router.get("/:id_biere", [...validateIdParam, errorValidator], biereController.getBiere);
router.delete("/:id_biere", [...validateIdParam, errorValidator], biereController.deleteBiere);
router.get("/bar/:id_bar/biere", [...validateIdParam, errorValidator], biereController.listBieres);
>>>>>>> main
=======

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
>>>>>>> 2f4e7d26b2fc6ffa6f00696dcef0f1d9590a6cb7

module.exports = router;
