import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";
import useWindowSize from "../hooks/useWindowSize";
import getCurrentUser from "../utils/getCurrentUser";
import newRequest from "../utils/newRequest";
const MyGigs = () => {
  const currentUser = getCurrentUser();
  useTitle("• MyGigs")
  const queryClient = useQueryClient();
  const [innerWidth, innerHeight] = useWindowSize();
  

  const { isLoading, error, data } = useQuery({
    queryKey: ["myGig"],
    queryFn: async () => {
      return newRequest(`/gigs?userId=${currentUser?._id}`).then(
        (res) => res.data
      );
    },
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGig"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id)
  }
  return (
    <div className="flex justify-center">
      <div className="w-[1400px] py-12 lg:px-0 px-2">
        <div className="flex justify-between gigs-center">
          <h1 className="font-bold text-2xl">Gigs</h1>
          <Link to={"/add"}>
            <button className="text-white bg-[#1dbf73] p-3 rounded-md">
              Add New Gig
            </button>
          </Link>
        </div>
        <table className="w-full">
          <tr className="h-12">
            <th className="text-left">Image</th>
            <th className="text-left">Title</th>
            <th className="text-left">Price</th>
            <th className="text-left">Sales</th>
            <th className="text-left">Actions</th>
          </tr>
          {isLoading
            ? "loading..."
            : error
            ? "Something went wrong!"
            : data?.map((gig) => (
                <tr className="h-12" key={gig?._id}>
                  <td>
                    <img
                      className="h-10 w-[50px] object-cover"
                      src={gig?.cover}
                      alt=""
                    />
                  </td>
                  <td >{innerWidth < 800 ? gig?.title?.slice(0, 30)+"..." : gig?.title}</td>
                  <td>{gig?.price}</td>
                  <td>{gig?.sales}</td>
                  <td>
                    <img
                     onClick={() => handleDelete(gig?._id)}
                      className="h-6 cursor-pointer"
                      src="img/delete.png"
                      alt=""
                    />
                  </td>
                </tr>
              ))}
        </table>
      </div>
    </div>
  );
};

export default MyGigs;
