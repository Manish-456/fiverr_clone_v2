import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    conversationId: { type: String, required: true},
    userId: { type: Schema.Types.ObjectId, ref : 'User' },
    desc : {type : String, required: true},
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);