const pool = require("../config/db");
const Movie = require("../models/Movie");

const MovieRepository = {
  getAllMovies: async () => {
    try {
      const movies = await pool.query("SELECT * FROM movies");
      return movies.rows.map(
        (row) => new Movie(row.id, row.title, row.genres, row.year, row.photo)
      );
    } catch (error) {
      throw new Error(`Unable to fetch movies: ${error.message}`);
    }
  },

  getMovieById: async (id) => {
    try {
      const movies = await pool.query("SELECT * FROM movies WHERE id = $1", [
        id,
      ]);
      if (movies.rows.length === 0) {
        return null;
      }
      const { title, genres, year, photo } = movies.rows[0];
      return new Movie(id, title, genres, year, photo);
    } catch (error) {
      throw new Error(`Unable to fetch movie with ID ${id}: ${error.message}`);
    }
  },

  createMovie: async (title, genres, year, photo) => {
    try {
      const movies = await pool.query(
        "INSERT INTO movies (title, genres, year, photo) VALUES ($1, $2, $3, $4) RETURNING id",
        [title, genres, year, photo]
      );
      const newMovieId = movies.rows[0].id;
      return new Movie(newMovieId, title, genres, year, photo);
    } catch (error) {
      throw new Error(`Unable to create movie: ${error.message}`);
    }
  },

  updateMovie: async (id, title, genres, year) => {
    try {
      const movies = await pool.query(
        "UPDATE movies SET title = $1, genres = $2, year = $3, WHERE id = $5 RETURNING *",
        [title, genres, year, id]
      );
      if (movies.rows.length === 0) {
        return null;
      }
      const updatedMovie = movies.rows[0];
      return new Movie(
        updatedMovie.id,
        updatedMovie.title,
        updatedMovie.genres,
        updatedMovie.year
      );
    } catch (error) {
      throw new Error(`Unable to update movie with ID ${id}: ${error.message}`);
    }
  },

  upload: async (id, source) => {
    console.log(id, source)
  try {
    const result = await pool.query(
      "UPDATE movies SET photo = $1 WHERE id = $2",
      [source, id]
    );

    if (result.rowCount === 0) {
      throw new Error(`Movie with ID ${id} not found`);
    }

    return result.rows[0];
  } catch (error) {
    throw new Error(
      `Unable to update movie photo with ID ${id}: ${error.message}`
    );
  }
  },

  deleteMovie: async (id) => {
    try {
      const movies = await pool.query(
        "DELETE FROM movies WHERE id = $1 RETURNING *",
        [id]
      );
      if (movies.rows.length === 0) {
        return null;
      }
      const deletedMovie = movies.rows[0];
      return new Movie(
        deletedMovie.id,
        deletedMovie.title,
        deletedMovie.genres,
        updatedMovie.year,
        updatedMovie.photo
      );
    } catch (error) {
      throw new Error(`Unable to delete movie with ID ${id}: ${error.message}`);
    }
  },
};

module.exports = MovieRepository;
