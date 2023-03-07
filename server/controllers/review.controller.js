import Review from "../models/review.model.js";
import Gig from "../models/gig.model.js";
import { createError } from "../utils/createError.js";

// @desc Create Reviews
// route POST /api/review
// @access private ==> Only Person with token and buyer can give a review

export const createReview = async (req, res, next) => {
  const newReview = new Review({
      ...req.body,
    userId: req.userId

  });
  try {
    const review = await Review.findOne({
      gigId: req.body.gigId,
      userId: req.userId,
    });
    if (review) return next(createError(403, "You have already created a review in this gig"));
    const savedReview = await newReview.save();
    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, starNumbers: 1 },
    }); 0.
   
    res.status(201).json(savedReview);
  } catch (err) {
    return next(err);
  }
}; 

// @desc get review
// route GET /api/review/:id
// @access public
export const getReview = async (req, res, next) => {
  try {
    const reviews = await Review.find({gigId : req.params.id});
    return res.json(reviews);
  } catch (err) {
    return next(err);
  }
};
export const deleteReview = async (req, res, next) => {
  try {
  } catch (err) {
    return next(err);
  }
};
