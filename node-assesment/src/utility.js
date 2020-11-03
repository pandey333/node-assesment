const jwt = require("jsonwebtoken");
require('dotenv').config();

const SIGNING_KEY = "dsfadfafsfa";

function generateJWT(payload) {
  return jwt.sign(payload, SIGNING_KEY, { expiresIn: "1d" });
}


function sanitizeUser(user) {
  const { password: dbPassword, ...sanitizedUser } = JSON.parse(
    JSON.stringify(user)
  );
  return sanitizedUser;
}

module.exports = {
  SIGNING_KEY,
  generateJWT,
  sanitizeUser,
};
