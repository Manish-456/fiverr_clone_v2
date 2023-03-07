
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import { createError } from "../utils/createError.js";
export const createMessage  = async (req, res, next) => {
    const newMessage = new Message({
      conversationId : req.body.conversationId,
      userId : req.userId,
      desc : req.body.desc
    });
  try {
    const savedMessage = await newMessage.save();
    await Conversation.findOneAndUpdate({id : req.body.conversationId}, {
        $set : {
            readBySeller :  req.isSeller,
            readByBuyer : !req.isSeller,
            lastMessage : req.body.desc
        }
    }, {
        new : true
    })
    res.status(201).json(savedMessage);
  } catch (err) {
    return next(err);
  }
};

export const getMessages = async (req, res, next) => {
  try {
 const messages = await Message.find({conversationId : req.params.id}).populate({path : "userId", select : "-password, -email"})
   return res.json(messages)
} catch (err) {
    return next(err);
  }
};
