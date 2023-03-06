const { validationResult } = require("express-validator");

const validatorErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpity()) {
    return res.status(501).json({
      ok: false,
      errors: errors.mapped(),
    });
  }
  next();
};

module.exports = validatorErrors;
