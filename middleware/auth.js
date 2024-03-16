const bcrypt = require("bcrypt");
const jwtUtils = require("../utils/jwtUtils");
const UserRepository = require("../repositories/UserRepository");

async function authenticateUser(email, password) {
  const user = await UserRepository.getUserByEmail(email);

  if (!user) {
    throw new Error("User not found");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("Invalid password");
  }

  const token = jwtUtils.generateToken({ userId: user.id });

  return token;
}

function authorizeUser(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decodedToken = jwtUtils.verifyToken(token);

    if (decodedToken.role === "Admin") {
      req.userData = { userId: decodedToken.userId };
      next();
    } else {
      return res
        .status(403)
        .json({ message: "Forbidden: Only admins are allowed" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}


module.exports = { authenticateUser, authorizeUser };
