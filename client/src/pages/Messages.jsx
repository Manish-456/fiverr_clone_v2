import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import newRequest from "../utils/newRequest";
import moment from "moment";
import getCurrentUser from "../utils/getCurrentUser";
import useTitle from "../hooks/useTitle";
 
  const Messages = () => {
    useTitle("• Messages")
  const queryClient = useQueryClient();
  const currentUser = getCurrentUser();
  const [users, setUsers] = useState({});
  

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      return newRequest("/conversation").then((res) => res.data);
    },
  });
  function activeClass(c) {
    let isActiveClass;
    if (
      (currentUser?.isSeller && !c.readBySeller) ||
      (!currentUser?.isSeller && !c.readByBuyer)
    ) {
      isActiveClass = "active";
    }
    return isActiveClass;
  }
  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversation/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });
  const handleRead = (id) => {
    mutation.mutate(id);
  };


 const getUser = async(id) => {
 
  const res = await newRequest.get(`/user/${id}`);
  return res.data.username
}

useEffect(() => {
  async function fetchUsers() {
    const userPromises = data?.map((c) => {
      if (currentUser?.isSeller) {
        return getUser(c?.buyerId);
      } else {
        return getUser(c?.sellerId);
      }
    });
    const users = userPromises && await Promise.all(userPromises);
    const userMap = {};
   data && data.forEach((c, i) => {
      userMap[c?.id] = users[i];
    });
    setUsers(userMap);
  }
  fetchUsers();
}, [data]);

const content =  data?.map((c) => {
  return (
   <tbody key={c?.id}>
     <tr   className={`h-12  ${activeClass(c)}`}>
      <td className="md:p-1 p-0 lg:text-xl text-sm">{users[c?.id]}</td>
      <td className="md:p-1 p-2 lg:text-xl text-sm">
        <Link to={`/message/${c?.id}`} state = {{
            ...(c.sellerId && {sellerId : c?.sellerId}),
            ...(c.sellerId && {buyerId : c?.buyerId})
          }}>
          {c?.lastMessage && c?.lastMessage?.substring(0, 100)}...
        </Link>
      </td>
      <td className="md:p-1 p-0 lg:text-xl text-sm">{moment(c?.updatedAt).fromNow()}</td>
      <td>
        {((currentUser?.isSeller && !c.readBySeller) ||
          (!currentUser?.isSeller && !c.readByBuyer)) && (
          <button
            onClick={() => handleRead(c?.id)}
            className="primary p-1  md:p-3 text-sm rounded-xl"
          >
            Mark as Read
          </button>
        )}
      </td>
    </tr>
   </tbody>
  );
})
  return (
    <div className="flex justify-center">
      {isLoading ? (
        "loading..."
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="w-[1400px] px-2 py-12 ">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-2xl">Messages</h1>
      
          </div>
      
          <table className="w-full ">
          <thead>
          <tr className="h-12">
              <th className="text-left md:p-1 p-0 lg:text-xl text-sm">
                {currentUser?.isSeller ? "Buyer" : "Seller"}
              </th>
              <th className="text-left md:p-1 p-0 lg:text-xl text-sm">Last Message</th>
              <th className="text-left md:p-1 p-0 lg:text-xl text-sm">Date</th>
              <th className="text-left">Action</th>
            </tr>
          </thead>
           {content}
          </table>
        </div>
      )}
    </div>
  );
};

export default Messages;
