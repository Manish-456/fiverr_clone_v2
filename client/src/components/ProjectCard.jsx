import React from "react";
import { Link } from "react-router-dom";
const CatCard = ({ project }) => {
  return (
    <Link to={`/gig/${project?._id}`}>
      <div className="shadow-md w-full lg:w-[300px] h-[300px] text-white  rounded-md cursor-pointer relative">
        <img
          src={project?.cover}
          alt=""
          className="w-full h-[70%] object-cover"
        />
        <div className="flex items-center gap-5 p-4">
          <img
            src={project?.user?.img || "/img/noavatar.jpg"}
            alt=""
            className="h-10 w-10 object-cover rounded-[50%] "
          />
          <div className="text-black">
            <h2 className="font-bold text-sm">{project?.user?.username}</h2>
            <span className="text-sm ">{project?.category}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CatCard;
