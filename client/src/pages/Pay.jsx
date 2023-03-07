import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../utils/newRequest";
import { useParams } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";
import useTitle from "../hooks/useTitle";

const stripePromise = loadStripe(
  "pk_test_51MBARNBCwO3wuxDAq9GpECkReZDp48Llui0mpeFkPgjVkt6JKmZkWBE3y6ay5IsYuHyeJtOKSLeoMLwNrSKsCTXM00Fl1k67IG"
);

const Pay = () => {
  useTitle("• Pay")
  const [clientSecret, setClientSecret] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest.post(`/order/create-payment-intent/${id}`);
        setClientSecret(res.data.clientSecret);
      } catch (err) {
      }
    };
    makeRequest();
  }, []);


  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Pay;
