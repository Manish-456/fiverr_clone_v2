import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useLocation, useParams } from "react-router-dom";
import getCurrentUser from "../utils/getCurrentUser";
import getSingleUser from "../utils/getSingleUser";
import newRequest from "../utils/newRequest";

const Message = () => {
  const { id } = useParams();
  const location = useLocation();
  const currentUser = getCurrentUser();
  const queryClient = useQueryClient();
  const { sellerId, buyerId } = location?.state;

  let buyer = currentUser?._id === sellerId ? buyerId : sellerId;
  let name = getSingleUser(buyer);

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      return newRequest(`/message/${id}`).then((res) => res.data);
    },
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/message`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };

  return (
    <div className="flex  md:justify-center">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Something went wrong"
      ) : (
        <div className="md:w-[1400px] w-full m-0 md:p-0 p-2 md:m-12">
          <span className="uppercase text-[13px] text-[#555] font-[400]">
            <Link to={"/messages"}>Message</Link> &gt; {name} &gt;
          </span>

          {/* Message box */}
          <div className="my-7 py-8  md:p-12 flex flex-col gap-5 h-[200px] lg:h-[350px] overflow-y-scroll">
            {data?.map((message) => {
              return (
                <div
                  key={message?._id}
                  className={
                    message?.userId?._id === currentUser?._id ? "own" : "other"
                  }
                >
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={message?.userId?.img || "/img/noavatar.jpg"}
                    alt=""
                  />
                  <p
                    className={
                      message?.userId?._id === currentUser?._id
                        ? "ownmessage text-sm p-3 md:text-lg md:p-4"
                        : "othermessage text-sm p-3 md:text-lg md:p-4"
                    }
                  >
                    {message?.desc}
                  </p>
                </div>
              );
            })}
          </div>
          <hr className="mb-5 border-[.25px] border-gray-300 h-[0]" />
          {/* input box */}
          <form
            onSubmit={handleSubmit}
            className="flex justify-between p-4 items-center"
          >
            <textarea
              className="border w-[80%] h-[80px] p-4 rounded-md border-gray-700"
              name=""
              placeholder="write a message"
              id=""
              cols="30"
              rows="10"
            ></textarea>
            <button
              type="submit"
              className="primary p-3 border-[none] w-[100px] font-semibold rounded-md"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Message;
