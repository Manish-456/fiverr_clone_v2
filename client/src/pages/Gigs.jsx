import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import GigCard from "../components/GigCard";
import useTitle from "../hooks/useTitle";

import newRequest from "../utils/newRequest";
const Gigs = () => {
  useTitle("• Gigs")
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");
 
  const minRef = useRef();
  const maxRef = useRef();
  const {search} = useLocation();
   let cat = search.replace("=", "?").split("?")
  
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: [search],
    queryFn: () =>
      newRequest(`/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`).then((res) => {
        return res.data;
      }),
  });

  const apply = () => {
  refetch();
  };

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort])

  return (
    <div className="flex md:p-0 p-4 justify-center">
      <div className="w-[1400px] py-[30px] flex flex-col  gap-4">
        <span className="uppercase text-[13px]">
          FIVERR &gt; {cat[2]} &gt;
        </span>
        <h1 className="font-bold text-3xl ">AI Artists</h1>
        <p className="text-[#95979d]">
          Explore the boundaries of art and technology with Fiverr's AI artists
        </p>

        <div className="flex  md:flex-row flex-wrap items-center justify-between">
          {/* left */}

          <div className="flex font-bold md:flex-row flex-wrap md:p-0 p-4 items-center gap-4 text-[#555]">
            <span>Budget</span>
            <input
              className="border placeholder:text-gray-300 placeholder:font-normal outline-none border-black rounded-lg px-3 py-1"
              type="text"
              ref={minRef}
              placeholder="min"
            />
            <input
              className="border placeholder:text-gray-300 placeholder:font-normal outline-none border-black rounded-lg px-3 py-1"
              type="text"
              placeholder="max"
              ref={maxRef}
            />
            <button className="primary px-8 py-1 rounded-md" onClick={apply}>
              Apply
            </button>
          </div>
          {/* right */}

          <div className="flex gap-3 md:mt-0 mt-4 md:p-0 p-4 relative items-center">
            <span className="text-[#555]">SortBy</span>
            <span className="font-bold">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img
              onClick={() => setOpen(!open)}
              src="/img/down.png"
              className="h-4 w-4 cursor-pointer"
              alt=""
            />
            {/* menu */}
            {open && (
              <div className="absolute top-8 z-8 flex flex-col gap-4 bg-white shadow-md p-5 rounded-xl right-0">
                {sort !== "sales" ? (
                  <span
                    onClick={() => reSort("sales")}
                    className="cursor-pointer"
                  >
                    Recommended
                  </span>
                ) : (
                  <span
                    onClick={() => reSort("createdAt")}
                    className="cursor-pointer"
                  >
                    Newest{" "}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-4 justify-center md:justify-between mt-4">
          {isLoading
            ? "Loading..."
            : error
            ? "Something went wrong. Please try again later.."
            :(data.length === 0)? "No gigs are currently available" : data?.map((gig) => {
                return <GigCard item={gig} key={gig._id} />;
              })}
        </div>
      </div>
    </div>
  );
};

export default Gigs;
