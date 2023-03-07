import mongoose from "mongoose";
import Gig from "../models/gig.model.js";
import { createError } from "../utils/createError.js";

// @desc Create Gigs
// route POST /api/gig
// @access private ==> Only Seller can create a gig

export const createGig = async (req, res, next) => {
  if (!req.isSeller)
    return next(createError(403, "Only seller can create a gigs"));
  const newGig = new Gig({
    user: req.userId,
    ...req.body,
  });
  try {
    const savedGig = await newGig.save();
    return res.status(201).json(savedGig);
  } catch (err) {
    return next(err);
  }
};

// @desc Delete Gigs
// route DELETE /api/gig
// @access private ==> Only if the user is Owner and seller can delete a gig
export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (gig.user.toString() !== req.userId)
      return next(createError(403, "You can delete only your gig!"));
    await Gig.findByIdAndDelete(req.params.id);
    return res.send("Gig has been deleted!");
  } catch (err) {
    return next(err);
  }
};

// @desc Get Single Gig
// route GET /api/gig/:id
// @access public ==> anyone can get the gig

export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id).populate({
      path: "user",
      select: "-password -__v",
    });
    if (!gig) next(createError(404, "Gig not found"));

    return res.json(gig);
  } catch (err) {
    return next(err);
  }
};

// @desc Get all Gigs
// route GET /api/gig
// @access public ==> anyone can get the gigS

export const getGigs = async (req, res, next) => {
  const q = req.query;

  const filters = {
    ...(q.cat && { category: { $regex: q.cat, $options: "i" } }),
    ...((q.min || q.max) && {
      price: { ...(q.min && { $gt: q.min }), ...(q.max && { $lt: q.max }) },
    }),
    ...(q.userId && { user: mongoose.Types.ObjectId(q.userId) }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };
  const sort = q.sort || "createdAt";
  try {
    const gig = await Gig.find(filters)
      .sort({ [sort]: -1 })
      .populate({ path: "user", select: "-password -__v" });
    return res.json(gig);
  } catch (err) {
    return next(err);
  }
};


export const getRandomGigs = async (req, res, next) => {
  try {
    const gig = await Gig.aggregate([
      { $sample: { size: 100 } },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          user: { password: 0, email : 0 },
        },
      },
    ]);
    return res.json(gig);
  } catch (err) {
    return next(err);
  }
};
