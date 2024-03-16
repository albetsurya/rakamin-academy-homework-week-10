const UserRepository = require("../repositories/UserRepository");

const UserController = {
  getUserById: async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const user = await UserRepository.getUserById(userId);
      console.log(user)
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const { email, password, gender, role } = req.body;
      const updatedUser = await UserRepository.updateUser(
        userId,
        email,
        password,
        gender,
        role
      );
      return res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const userId = req.params.userId;
      await UserRepository.deleteUser(userId);
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = UserController;
