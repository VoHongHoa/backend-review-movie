import ReviewsDAO from "../DAO/reviewsDao.js";
export default class ReviewsController {
  static async apiPostReview(req, res, next) {
    try {
      const movieId = req.body.movie_id;
      const review = req.body.review;
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id,
      };
      const date = new Date();
      const ReviewResponse = await ReviewsDAO.addReview(
        movieId,
        review,
        userInfo,
        date
      );
      res.json({
        status: "success",
      });
    } catch (e) {
      res.status(500).json({ error: e.error });
    }
  }
  static async apiUpdateReview(req, res, next) {
    try {
      const reviewId = req.body.review_id;
      const review = req.body.review;
      const date = new Date();
      const ReviewRespone = await ReviewsDAO.updateReview(
        reviewId,
        req.body.user_id,
        review,
        date
      );
      var { error } = ReviewRespone;
      if (error) {
        res.json(error);
      }
      if (ReviewRespone.modifiedCount === 0) {
        throw new Error(
          "Unable to update review. User may not be original poster"
        );
      }
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.error });
    }
  }
  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.body.review_id;
      const userId = req.body.user_id;
      const ReviewRespone = await ReviewsDAO.deleteReview(reviewId, userId);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.error });
    }
  }
}
