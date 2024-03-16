const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/MovieController");
const upload = require("../middlewares/upload");

router.get("/", MovieController.getAllMovies);
router.get("/:id", MovieController.getMovieById);
router.post("/", upload.single("photo"), MovieController.createMovie);
router.put("/:id", upload.single("photo"), MovieController.updateMovie);
router.delete("/:id", MovieController.deleteMovie);

module.exports = router;
