import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Featured = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const handleSearch = () => {
    navigate(`/gigs?search=${input}`);
  };

  const buttonClass =
    "navButton text-sm md:text-lg py-1 px-4 rounded-2xl hover:bg-gray-300 hover:text-black";
  return (
    <div className="h-[600px] flex justify-center text-white bg-[#013914]">
      <div className="w-full md:w-[1400px] lg:px-0 px-2 flex justify-between items-center">
        {/* left */}
        <div className="flex flex-col  gap-8">
          <h1 className="md:text-5xl  md:w-full w-[291px] text-xl p-2  font-bold">
            <span className="text-[33px]">
              Find the perfect{" "}
              <i className="font-semibold font-[DomaineDisplay]"> freelance </i>{" "}
              services for your business
            </span>
          </h1>
          {/* search */}
          <div className="flex mx-2 lg:w-full  w-[80%] justify-between rounded-sm bg-white items-center">
            {/* searchinput */}
            <div className="flex items-center gap-3 p-0 md:py-4 md:px-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 md:block hidden text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>

              <input
                type="text"
                className="border-none outline-none w-full p-2 md:p-0 text-sm  text-black md:text-xl"
                onChange={(e) => setInput(e.target.value)}
                placeholder={'Try "building mobile app" '}
              />
            </div>
            <button
              onClick={handleSearch}
              className=" primary text-black border-none w-[67px] md:w-[120px] h-[40px] md:h-[60px] "
            >
              Search
            </button>
          </div>
          <div className="flex  p-2 flex-wrap  md:items-center gap-4 lg:gap-8">
            <span>Popular:</span>
            <Link to={"/gigs?cat=web"}>
              <button className={buttonClass}>Web Development</button>
            </Link>
            <Link to={"/gigs?cat=design"}>
              <button className={buttonClass}>WordPress / Logo Design</button>
            </Link>
            <Link to={"/gigs?cat=animation"}>
              {" "}
              <button className={buttonClass}>Animation</button>
            </Link>
            <Link to={"/gigs?cat=ai"}>
              {" "}
              <button className={buttonClass}>Ai Services</button>
            </Link>
          </div>
        </div>
        {/* right */}
        <div className="h-full md:block hidden">
          <img
            src="/img/man.png"
            alt=""
            className="h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Featured;
