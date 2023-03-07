import mongoose, { Schema } from "mongoose";

const gigSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref : 'User' },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    totalStars: { type: Number, default: 0 },
    starNumbers: { type: Number, default: 0 },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    cover: { type: String, required: true },
    images: { type: [String], required: false },
    sales: { type: Number, default: 0 },
    shortTitle: { type: String, required: true },
    shortDesc: { type: String, required: true },
    deliveryTime: { type: Number, required: true },
    revisionNumber: { type: Number, required: true },
    features: { type: [ String ], required: false },
  },
  { timestamps: true }
);

export default mongoose.model("Gig", gigSchema);
