const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const reguisterUser = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(501).json({
      ok: false,
      error: error.mapped(),
    });
  }

  const { email, password, username } = req.body;
  try {
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(501).json({
        ok: false,
        msg: "Co rreo ya registrado",
      });
    }
    const nuevoUser = new Usuario({ email, password, username });
    const salt = bcryptjs.genSaltSync(12);

    nuevoUser.password = bcryptjs.hashSync(password, salt);

    await nuevoUser.save();

    const payload = { id: nuevoUser.id };
    jwt.sign(
      payload,
      process.env.SECRETA,
      { expiresIn: 3600 },
      (error, token) => {
        res.json({
          ok: true,
          id: nuevoUser.id,
          username,
          msg: "Usuario Creado",
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      msg: "error al registrar",
    });
  }

  //console.log({email, password,username})

  //res.json({username})
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(501).json({
      ok: false,
      error: error.mapped(),
    });
  }

  try {
    let usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(401).json({
        ok: false,
        msg: "correo o contrasena invalida",
      });
    }

    const passwordValido = bcryptjs.compareSync(password, usuario.password);

    if (!passwordValido) {
      return res.status(401).json({
        ok: false,
        msg: "correo o contrasena invalida",
      });
    }

    const payload = { id: usuario.id };
    jwt.sign(
      payload,
      process.env.SECRETA,
      { expiresIn: 3600 },
      (error, token) => {
        res.json({
          ok: true,
          id: usuario.id,
          username: usuario.username,
          msg: "Usuario Autenticado",
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      msg: "error al registrar",
    });
  }
};

module.exports = {
  loginUser,
  reguisterUser,
};
