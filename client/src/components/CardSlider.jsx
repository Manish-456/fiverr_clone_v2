import React from "react";
import Slider from "infinite-react-carousel";

const CardSlider = ({ children, slidesToShow, arrowsScroll }) => {
  return (
    <div className="flex justify-center p-20">
      <div className="w-[1400px]">
        <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll}>
          {children}
        </Slider>
      </div>
    </div>
  );
};

export default CardSlider;
