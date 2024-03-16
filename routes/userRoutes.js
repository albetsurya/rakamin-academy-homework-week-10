const express = require("express");
const UserController = require("../controllers/UserController");
const { authorizeUser } = require("../middleware/auth");


const router = express.Router();

router.get("/:userId", authorizeUser, UserController.getUserById);
router.put("/:userId", authorizeUser, UserController.updateUser);
router.delete("/:userId", authorizeUser, UserController.deleteUser);

module.exports = router;
