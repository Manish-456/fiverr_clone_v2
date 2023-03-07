
import React from "react";
import { Link } from "react-router-dom";


const GigCard = ({ item }) => {
  return (
    <Link to={`/gig/${item._id}`}>
      <div className="w-[324px] h-[400px] border border-gray-300 mb-4 ">
        <img src={item?.cover} alt="" className="w-full max-h-[180px] object-cover" />
        <div className="flex flex-col px-3  gap-4">
      
            <div className="flex mt-2 items-center gap-3">
              <img
                src={item?.user?.img || "/img/noavatar.jpg"}
                alt=""
                className="w-6 h-6 object-cover rounded-xl"
              />
              <span>{item?.user?.username}</span>
            </div>
       
          <p className="text-[#111]">{item.title}</p>
          <div className="flex px-4 mb-2 items-center gap-2">
            <img
              src="/img/star.png"
              alt=""
              className="w-3 h-3 object-cover"
            />
            <span className="font-bold text-sm">
              {(!isNaN(Math.round(item.totalStars / item.starNumbers)) &&
                Math.round(item.totalStars / item.starNumbers)!== Infinity)  &&
                Math.round(item.totalStars / item.starNumbers)}
            </span>
          </div>
        </div>
        <hr className="h-0 mb-2 border-gray-300" />
        <div className="flex py-2 px-2  items-center justify-between">
          <img
            src="/img/heart.png"
            alt=""
            className="h-4 w-4 cursor-pointer"
          />
          <div className="">
            <span className="text-[#999] text-sm ">STARTING AT</span>
            <h1 className="text-[#555] text-sm lg:text-lg font-semibold">${item.price}</h1>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
