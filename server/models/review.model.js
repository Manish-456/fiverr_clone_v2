import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
  {gigId : {type : String, required: true},
  userId : {type : String, required: true},
  star : {type : Number, enum : [1, 2, 3, 4, 5]},
  desc : {type : String, required: true}
},
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);