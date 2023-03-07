import React from "react";

const Trusted = () => {
  return (
    <div className="flex  justify-center h-[150px] md:h-[100px] bg-gray-50">
     <div className="w-[760px] flex-wrap  flex gap-4 md:gap-10 items-center justify-center p-4 bg-gray-50">
     <span className="text-gray-400  text-xl">Trusted By</span>
      <img  src={"/img/facebook.png"} alt="facebook" className="" />
      <img src={"/img/Google.png"} className="h-[40px] lg:h-[60px] " alt="google" />
      <img src={"/img/netflix.png"} className="h-[40px] lg:h-[60px]" alt="netflix" />
      <img src={"/img/pg.png"} alt="pg" className="h-[40px] lg:h-[60px]" />
      <img src={"/img/paypal.png"} alt="paypal" className="h-[40px] lg:h-[60px]"/>
     </div>
    </div>
  );
};

export default Trusted;
