// src/controllers/MovieController.js
import apiClient from "../services/api-client";
import Movie from "../models/MovieModel.jsx";

class MovieController {
  async getAllMovies() {
    const res = await apiClient.get("/movies");
    return res.data.map(m => new Movie(m));
  }

  async getMovieById(id) {
    const res = await apiClient.get(`/movies/${id}`);
    return new Movie(res.data);
  }
}

export default new MovieController;