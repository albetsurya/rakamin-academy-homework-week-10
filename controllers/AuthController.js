const bcrypt = require("bcrypt");
const jwtUtils = require("../utils/jwtUtils");
const UserRepository = require("../repositories/UserRepository");

const AuthController = {
  registerUser: async (req, res, next) => {
    try {
      const { email, password, gender, role } = req.body;

      const existingUser = await UserRepository.findByEmail(email);
      if (existingUser.length > 0) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 8);

      const newUser = await UserRepository.createUser(
        email,
        hashedPassword,
        gender,
        role
      );

      return res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  },

  loginUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await UserRepository.findByEmail(email);
      console.log(user.rows[0]);
      if (!user.rows[0]) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const isValidPassword = await bcrypt.compare(
        password,
        user.rows[0].password
      );
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const token = jwtUtils.generateToken(user.rows[0].id, user.rows[0].role);
      res.json({ token });
console.log(token)
      return res.status(200).json({ user: user.rows[0], token });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = AuthController;
