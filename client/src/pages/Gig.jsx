import { useQuery } from "@tanstack/react-query";
import { Slider } from "infinite-react-carousel/lib";

import { useNavigate, useParams } from "react-router-dom";
import Reviews from "../components/Reviews";
import getCurrentUser from "../utils/getCurrentUser";

import newRequest from "../utils/newRequest";

const Gig = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
 
  const { isLoading, error, data } = useQuery({
    queryKey: ["gig._id"],
    queryFn: () =>
      newRequest(`gigs/${id}`).then((res) => {
        return res.data;
      }),
  });
 
  const handlePay = (id) => {
    navigate(`/pay/${id}`)
  }

  const box = (top, bottom) => {
    return (
      <>
        <div className="flex flex-col gap-1 w-[300px] mb-8">
          <span className="font-[300]">{top}</span>
          <span>{bottom}</span>
        </div>
      </>
    );
  };

  return (
    <div className="flex  justify-center">
      {isLoading ? (
        "Loading... Please wait.."
      ) : error ? (
        "Something went wrong. Please try again"
      ) : (
        <div className="w-[1400px] md:flex-row flex-col py-8 px-4 md:px-0  flex gap-12">
          {/* left */}
          <div className="flex-[2] flex  flex-col gap-5">
            <span className="uppercase text-[13px] text-blue-400 font-[300]">
              FIVERR &gt; {data?.category} &gt;
            </span>
            <h1 className="text-[28px] font-bold overflow-ellipsis">
              {data?.title}
            </h1>
    
              <div className="flex items-center gap-3">
                <img
                  src={data?.user.img || "/img/noavatar.jpg"}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm font-semibold">{data.user?.username}</span>
                {!isNaN(Math.round(data.totalStars / data.starNumbers)) &&
                  Math.round(data.totalStars / data.starNumbers) !==
                    Infinity && (
                    <div className="flex items-center gap-1">
                      {Array(Math.round(data.totalStars / data.starNumbers))
                        .fill()
                        .map((item, i) => {
                          return (
                            <img
                              src="/img/star.png"
                              key={i}
                              className="w-[14px] h-[14px]"
                              alt="star"
                            />
                          );
                        })}
                      <span className="text-[#ffc107] font-bold">
                        {Math.round(data.totalStars / data.starNumbers)}
                      </span>
                    </div>
                  )}
              </div>
           
            {data?.images?.length > -1 ? (
              <Slider slidesToShow={1} arrowsScroll={1} className="mt-4">
                {data?.images?.map((img) => {
                  return (
                    <img
                      src={img}
                      key={img}
                      alt=""
                      className="md:object-contain object-cover h-[300px] md:h-[500px]"
                    />
                  );
                })}
              </Slider>
            ) : null}
            <h2 className="pb-[25px] font-[400] text-[20px]">About This Gig</h2>

            <p className="font-[400] text-[#555] leading-6">{data?.desc}</p>
            {/* seller */}
            {isLoading ? (
              "loading..."
            ) : error ? (
              "something went wrong"
            ) : (
              <div className="mt-12 flex flex-col gap-5">
                <h2>About The Seller</h2>
                {/* user profile stars */}
                <div className="flex items-center  gap-4">
                  <img
                    src={data.user?.img || "/img/noavatar.jpg"}
                    alt=""
                    className="w-24 h-24 rounded-full object-cover"
                  />

                  <div className="flex flex-col  gap-[10px] ">
                    <span className="font-semibold">{data.user?.username}</span>
                    {!isNaN(Math.round(data.totalStars / data.starNumbers)) &&
                      Math.round(data.totalStars / data.starNumbers) !==
                        Infinity && (
                        <div className="flex items-center gap-1">
                          {Array(Math.round(data.totalStars / data.starNumbers))
                            .fill()
                            .map((item, i) => {
                              return (
                                <img
                                  src="/img/star.png"
                                  key={i}
                                  className="w-[14px] h-[14px]"
                                  alt="star"
                                />
                              );
                            })}
                          <span className="text-[#ffc107] font-bold">
                            {Math.round(data.totalStars / data.starNumbers)}
                          </span>
                        </div>
                      )}
                    <button className="primary px-3 py-1 rounded-md">
                      Contact Me
                    </button>
                  </div>
                </div>
                {/* user address details and many more */}
                <div className="flex border border-gray p-5 rounded-sm shadow mt-5 flex-col gap-4">
                  <div className="flex justify-between flex-wrap ">
                    {box("From", data.user?.country)}
                    {box("Member Since",data.user?.createdAt)}
                    {box("Avg. response time", "About 6 hours")}
                    {box("Last delivery", "About 6 hours")}
                    {box("Languages", "English")}
                  </div>
                  <hr className="border mb-5" />
                  <p>{data.user?.desc}</p>
                </div>
              </div>
            )}
            {/* reviewReviewss */}
             <Reviews gigId={data?._id}/>
          </div>

          {/* right */}
          <div
            className="h-max flex-1 border border-gray-500 p-4 rounded-sm flex flex-col gap-3 sticky top-[150px] 
         max-h-[900px]
        "
          >
            {/* price */}
            <div className="flex items-center justify-between">
              <h2 className="font-[500]">{data?.shortTitle}</h2>
              <h3 className="font-[300]">$ {data?.price}</h3>
            </div>
            <p className="text-gray-[500] my-3">{data?.shortDesc}</p>
            {/* details */}
            <div className="flex items-center justify-between text-[14px]">
              <div className="flex items-center gap-3">
                <img className="w-5" src="/img/clock.png" alt="" />
                <span> {data?.deliveryTime} days delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <img className="w-5" src="/img/recycle.png" alt="" />
                <span>{data?.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="flex  flex-col gap-3">
              {data?.features.length > -1 &&
                data?.features?.map((feature, index) => {
                  return (
                    <div
                      key={index}
                      className="flex text-gray-500 items-center gap-3 font-[300]"
                    >
                      <img className="w-4" src="/img/greencheck.png" alt="" />
                      <span>{feature}</span>
                    </div>
                  );
                })}
            </div>
            
            <button disabled={currentUser?.isSeller}   onClick={() => handlePay(id)} className="primary p-3 font-semibold text-lg rounded-md">
              Continue
            </button>
           
          </div>
        </div>
      )}
    </div>
  );
};

export default Gig;
