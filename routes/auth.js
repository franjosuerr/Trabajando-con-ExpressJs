const { Router } = require("express");
const { check } = require("express-validator");
const { loginUser, reguisterUser } = require("../controllers/authControllers");
const validatorErrors = require("../middelwares/validateErrors");

const authRouter = Router();

authRouter.post(
  "/register",
  [
    check("email", "El formato invalido").isEmail(),
    check("password", "el password debe ser de 6").isLength({ min: 6 }),
    check("username", "usuario requerido").not().isEmpty(),
    validatorErrors,
  ],
  reguisterUser
);
authRouter.post(
  "/login",
  [
    check("email", "El formato invalido").isEmail(),
    check("password", "el password debe ser de 6").isLength({ min: 6 }),
    validatorErrors,
  ],
  loginUser
);
module.exports = authRouter;
