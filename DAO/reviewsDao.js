import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
let reviews;
export default class ReviewsDAO {
  static async injectDB(conn) {
    if (reviews) {
      return;
    }
    try {
      reviews = await conn.db(process.env.MOVIEREVIEWS_NS).collection("review");
    } catch (e) {
      console.error(`unable to connect in ReviewDAO: ${e}`);
    }
  }
  static async addReview(movieId, review, userInfo, date) {
    try {
      const reviewDoc = {
        name: userInfo.name,
        user_id: userInfo._id,
        date: date,
        review: review,
        movie_id: ObjectId(movieId),
      };
      //console.log(reviewDoc);
      return await reviews.insertOne(reviewDoc);
    } catch (e) {
      console.error(`unable to post review: ${e}`);
      return { error: e };
    }
  }
  static async updateReview(reviewId, userId, review, date) {
    try {
      const updateResponse = await reviews.updateOne(
        { user_id: userId, _id: ObjectId(reviewId) },
        { $set: { review: review, date: date } }
      );
      return updateResponse;
    } catch (e) {
      console.error(`unable to post review: ${e}`);
      return { error: e };
    }
  }
  static async deleteReview(reviewId, userId) {
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: ObjectId(reviewId),
        user_id: userId,
      });
      return deleteResponse;
    } catch (e) {
      console.error(`unable to post review: ${e}`);
      return { error: e };
    }
  }
}
