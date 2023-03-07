import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useTitle from "../hooks/useTitle";
import newRequest from "../utils/newRequest";

const Success = () => {
  useTitle("• Payment-Success")
  const { search } = useLocation();

  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await newRequest.put("/order", { payment_intent });
        setTimeout(() => {
          navigate("/orders");
        }, 3000);
      } catch (err) {
      }
    };
    makeRequest();
  }, [payment_intent]);
  return (
    <div className="p-4 mt-10 flex flex-col items-center  justify-center font-bold text-3xl text-green-500">
      <span className="mb-4">Payment successful. 🎉🎉</span>{" "}
      <span className="mb-4">
        You are being redirected to the orders page. Please do not close the
        page
      </span>
    </div>
  );
};

export default Success;
