import Order from "../models/order.model.js";
import Gig from "../models/gig.model.js";
import Stripe from "stripe";


export const intent = async (req, res, next) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_KEY);
    const gig = await Gig.findById(req.params.gigId);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: gig.price * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    const newOrder = new Order({
      gigId: gig._id,
      title: gig.title,
      buyerId: req.userId,
      sellerId: gig.user,
      price: gig.price,
      payment_intent: paymentIntent.id,
      img: gig.cover,
    });

    await newOrder.save();
    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    return next(err);
  }
};

export const confirmPayment = async(req, res, next) => {
  try {
   await Order.findOneAndUpdate({
      payment_intent : req.body.payment_intent
     }, {
      $set : { isCompleted : true}
     }, {
      new : true
     })
     return res.send("Order has been confirmed!");    
  } catch (err) {
     return next(err)
  }
}

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    });
    return res.json(orders);
  } catch (err) {
    return next(err);
  }
};
