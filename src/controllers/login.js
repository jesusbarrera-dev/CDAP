const passport = require('passport');

const crtl = {}

crtl.index = (req, res) => {
  console.log(req.body.correo);
};

module.exports = crtl;

