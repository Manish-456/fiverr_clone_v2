import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import newRequest from "../utils/newRequest";
import Review from "./Review";

const Reviews = ({ gigId }) => {
  
  const queryClient = useQueryClient();
  const [desc, setDesc] = useState("");
  const [star, setStar] = useState(1);
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequest(`/review/${gigId}`).then((res) => {
        return res.data;
      }),
  });



  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/review", review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ desc, star, gigId });
    setDesc("");
    setStar(1)
  };
  return (
    <div className="mt-4">
      <h2>Reviews</h2>
      {isLoading
        ? "loading..."
        : error
        ? "Something went wrong"
        : data?.map((review) => {
            return <Review review={review} key={review._id} />;
          })}

      <div className="flex flex-col gap-8 mt-5">
        <h3>Add a review</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            className="border border-gray-500 p-4"
            placeholder="Wrie your opinion"
            onChange={(e) => setDesc(e.target.value)}
          />
          <select className="p-4 border border-gray-400 w-[200px] self-end" name="" id="" onChange={(e) => setStar(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button className="bg-[#1dbf73] w-[100px] text-white font-bold   p-3 self-end">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
