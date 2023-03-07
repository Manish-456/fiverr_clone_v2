import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import newRequest from "../utils/newRequest";
import useWindowSize from "../hooks/useWindowSize";
import getCurrentUser from "../utils/getCurrentUser";
import useTitle from "../hooks/useTitle";
const Order = () => {
  useTitle("• Order");
  const currentUser = getCurrentUser();
  const [innerWidth, innerHeight] = useWindowSize();
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      return newRequest("/order").then((res) => res.data);
    },
  });

  const handleContact = async (order) => {
    const { sellerId, buyerId } = order;
    const id = sellerId + buyerId;
    try {
      const res = await newRequest.get(`/conversation/single/${id}`);
      navigate(`/message/${res?.data?.id}`, { state: { sellerId, buyerId } });
    } catch (err) {
      if (err.response.status === 404 && buyerId === currentUser?._id) {
        const res = await newRequest.post("/conversation/", {
          to: currentUser?.isSeller ? buyerId : sellerId,
        });
        navigate(`/message/${res?.data?.id}`);
      }
    }
  };

  return (
    <div className="flex justify-center">
      {isLoading ? (
        "loading..."
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="w-[1400px] py-12 ">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-2xl">Orders</h1>
          </div>
          <table className="w-full">
            <thead>
              <tr className="h-12">
                <th className="text-left">Image</th>
                <th className="text-left">Title</th>
                <th className="text-left">Price</th>

                <th className="text-left">Contact</th>
              </tr>
            </thead>
            {data?.map((order) => {
              return (
                <tbody key={order?._id}>
                  <tr className="h-12">
                    <td>
                      <img
                        className="h-6 w-[50px] object-cover"
                        src={order?.img}
                        alt=""
                      />
                    </td>
                    <td>
                      {innerWidth < 800
                        ? order?.title?.slice(0, 30) + "..."
                        : order?.title}
                    </td>
                    <td>{order?.price}</td>

                    <td>
                      <img
                        onClick={() => handleContact(order)}
                        className="h-6 cursor-pointer"
                        src="img/message.png"
                        alt=""
                      />
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      )}
    </div>
  );
};

export default Order;
