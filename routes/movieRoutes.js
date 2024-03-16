const express = require("express");
const MovieController = require("../controllers/MovieController");
// const upload = require("../middlewares/upload");
const { authorizeUser } = require("../middleware/auth");
const multer = require("../middleware/multer");

const router = express.Router();

router.get("/", MovieController.getAllMovies);
router.get("/:id", MovieController.getMovieById);
router.post(
  "/create",
  authorizeUser,
  MovieController.createMovie
);
router.put(
  "/update/:id",
  authorizeUser,
  MovieController.updateMovie
);
router.patch(
  "/update/:id",
  // authorizeUser,
  multer(),
  MovieController.uploadPhoto
);
router.delete("/delete/:id", authorizeUser, MovieController.deleteMovie);

module.exports = router;
