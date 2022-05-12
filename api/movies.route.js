import express from "express";
import MoviesController from "./movies.controller.js";
import ReviewsController from "./reviews.controller.js";
const router = express.Router();
router.get("/", MoviesController.apiGetMovies);

router.get("/id/:id", MoviesController.apiGetMovieById);
router.get("/ratings", MoviesController.apiGetRatings);

router
  .route("/review")
  .post(ReviewsController.apiPostReview)
  .put(ReviewsController.apiUpdateReview)
  .delete(ReviewsController.apiDeleteReview);
export default router;
