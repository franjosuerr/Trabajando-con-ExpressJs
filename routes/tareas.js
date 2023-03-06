const { Router } = require("express");
const { check } = require("express-validator");
const validatorErrors = require("../middelwares/validateErrors");
const verifyToken = require("../middelwares/verifyToken");

const {
  createTarea,
  readTarea,
  updateTarea,
  deleteTarea,
} = require("../controllers/tareaController");

const router = Router();

router.post(
  "/create",
  [
    check("nombre", "Nombre del proyecto obligatorio").not().isEmpty(),
    validatorErrors,
    verifyToken,
  ],
  createTarea
);
router.get("/read", [verifyToken], readTarea);
router.put(
  "/update/:idUser",
  [
    check("nombre", "Nombre del proyecto obligatorio").not().isEmpty(),
    validatorErrors,
    verifyToken,
  ],
  updateTarea
);
router.delete("/delete/:idUser", [verifyToken], deleteTarea);

module.exports = router;
