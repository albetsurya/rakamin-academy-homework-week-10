const MovieRepository = require("../repositories/MovieRepository");

const MovieController = {
  getAllMovies: async (req, res) => {
    try {
      const movies = await MovieRepository.getAllMovies();
      res.json(movies);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getMovieById: async (req, res) => {
    const { id } = req.params;
    try {
      const movie = await MovieRepository.getMovieById(id);
      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      }
      res.json(movie);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createMovie: async (req, res) => {
    const { title, genres, year, photo } = req.body;
    try {
      const newMovie = await MovieRepository.createMovie(
        title,
        genres,
        year,
        photo
      );
      res.status(201).json(newMovie);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateMovie: async (req, res) => {
    const { id } = req.params;
    const { title, genres, year, photo } = req.body;
    try {
      const updatedMovie = await MovieRepository.updateMovie(
        id,
        title,
        genres,
        year,
        photo
      );
      if (!updatedMovie) {
        return res.status(404).json({ message: "Movie not found" });
      }
      res.json(updatedMovie);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  uploadPhoto: async (req, res) => {
    const file = req.file;
    const { id } = req.params;

if (!file || !id) {
  return res.status(400).json({
    message: "Missing file or ID",
  });
}file

try {
  const result = await MovieRepository.upload(id, file.filename);

  res.status(201).json({ message: "File uploaded successfully", result });
} catch (error) {
  console.error("Error uploading file:", error);
  res.status(500).json({ error: "Internal server error" });
}
  },

  deleteMovie: async (req, res) => {
    const { id } = req.params;
    try {
      const deletedMovie = await MovieRepository.deleteMovie(id);
      if (!deletedMovie) {
        return res.status(404).json({ message: "Movie not found" });
      }
      res.json(deletedMovie);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = MovieController;
