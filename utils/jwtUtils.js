const jwt = require("jsonwebtoken");
require("dotenv").config();


const generateToken = (userId, userRole) => {

  const token = jwt.sign({ userId, role: userRole }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
};

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { generateToken, verifyToken };
