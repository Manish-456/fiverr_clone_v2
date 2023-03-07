import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../utils/createError.js";

// @desc Register
// route POST/api/auth/register
// @access public

export const register = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    const savedUser = await newUser.save();

    return res.status(201).json(savedUser);
  } catch (err) {
    return next(err);
  }
};

// @desc Login
// route POST/api/auth/login
// @access public

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return next(createError(404, "User not found"));
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return next(createError(400, "Invalid username or password!"));
    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.ACCESS_TOKEN_SECRET
    );
    const { password, ...rest } = user._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json(rest);
  } catch (err) {
    return next(err);
  }
};

// @desc logout
// route POST/api/auth/logout
// @access private

export const logOut = (req, res, next) => {
  const cookies = req.cookies;

  try {
    if (!cookies.accessToken) return res.sendStatus(204);
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    return res.send("User logged out successfully");
  } catch (error) {
    return next(error);
  }
};
