const db = require("../config/db");

const UserRepository = {
  findByEmail: async (email) => {
    try {
      const existingUser = await db.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      return existingUser;
    } catch (error) {
      throw error;
    }
  },

  createUser: async (email, password, gender, role) => {
    try {
      const newUser = await db.query(
        "INSERT INTO users(email, password, gender, role) VALUES($1, $2, $3, $4) RETURNING *",
        [email, password, gender, role]
      );
      return newUser[0];
    } catch (error) {
      throw error;
    }
  },

  getUserById: async (userId) => {
    try {
      const user = await db.query("SELECT * FROM users WHERE id = $1", [
        userId,
      ]);
      console.log(user)
      return user.rows[0];
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (userId, email, password, gender, role) => {
    try {
      const updatedUser = await db.query(
        "UPDATE users SET email = $1, password = $2, gender = $3, role = $4 WHERE id = $5 RETURNING *",
        [email, password, gender, role, userId]
      );
      return updatedUser[0];
    } catch (error) {
      throw error;
    }
  },

  deleteUser: async (userId) => {
    try {
      await db.query("DELETE FROM users WHERE id = $1", [userId]);
      return { message: "User deleted successfully" };
    } catch (error) {
      throw error;
    }
  },
};

module.exports = UserRepository;
