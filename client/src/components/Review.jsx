import { useQuery } from "@tanstack/react-query";
import React from "react";
import newRequest from "../utils/newRequest";

const Review = ({ review }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [review?.userId],
    queryFn: () =>
      newRequest(`/user/${review?.userId}`).then((res) => {
        return res.data;
      }),
  });


  return (
    <div className="flex my-4 gap-5 flex-col">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Something went wrong"
      ) : (
        <div className="flex gap-4">
          <img
            src={data?.img || "/img/noavatar.jpg"}
            alt=""
            className="h-12 w-12 rounded-full object-cover"
          />
          {/* info review */}
          <div className="flex flex-col gap-1 ">
            <span className="font-semibold">{data?.username}</span>
            {/* country */}
            <div className="flex gap-2 text-gray-500 items-center">
              <span>{data?.country}</span>
            </div>
          </div>
        </div>
      )}
      {/* stars */}
      <div className="flex items-center gap-1">
        {Array(review.star)
          .fill()
          .map((item, i) => {
            return (
              <img
                key={i}
                src="/img/star.png"
                className="w-[14px] h-[14px]"
                alt="star"
              />
            );
          })}
        <span className="text-[#ffc107] font-bold">{review.star}</span>
      </div>
      <p>{review?.desc}</p>
      <div className="flex items-center gap-2">
        <span>Helpful?</span>
        <img src="/img/like.png" className="w-4 h-4" alt="like" />
        <span>Yes</span>
        <img src="/img/dislike.png" className="w-4 h-4" alt="like" />
        <span>No</span>
      </div>
      <hr className="mb-4" />
    </div>
  );
};

export default Review;
