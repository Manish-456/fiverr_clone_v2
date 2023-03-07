import React from "react";
import facebook from "../assets/facebook.png";
import Google from "../assets/google.png";
import netflix from "../assets/netflix.png";
import pg from "../assets/pg.png";
import paypal from "../assets/paypal.png";
const Trusted = () => {
  return (
    <div className="flex  justify-center h-[150px] md:h-[100px] bg-gray-50">
     <div className="w-[760px] flex-wrap  flex gap-4 md:gap-10 items-center justify-center p-4 bg-gray-50">
     <span className="text-gray-400  text-xl">Trusted By</span>
      <img  src={facebook} alt="facebook" className="" />
      <img src={Google} className="h-[40px] lg:h-[60px] " alt="google" />
      <img src={netflix} className="h-[40px] lg:h-[60px]" alt="netflix" />
      <img src={pg} alt="pg" className="h-[40px] lg:h-[60px]" />
      <img src={paypal} alt="paypal" className="h-[40px] lg:h-[60px]"/>
     </div>
    </div>
  );
};

export default Trusted;
