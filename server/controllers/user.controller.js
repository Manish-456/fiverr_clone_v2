import User from "../models/user.model.js";
import { createError } from "../utils/createError.js";

export const deleteUser = async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.id });

  if (req.userId !== user._id.toString())
    return next(createError(403, "You cannot delete others account"));
  await User.findByIdAndDelete(req.params.id);
  return res.send("User has been deleted");
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
};

export const upgradeToSeller = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError(404, "User not found"));
   const data = await User.findByIdAndUpdate(
      user._id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    const {password, ...others} = data._doc;
    return res
      .status(200)
      .send(others);
  } catch (err) {
    return next(err);
  }
};
