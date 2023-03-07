import React from "react";
import Featured from "../components/Featured";
import CardSlider from "../components/CardSlider";
import Trusted from "../components/Trusted";
import CatCard from "../components/CatCard";
import { cards } from "../data";
import video from "../assets/video1.mp4";
import check from "../assets/check.png";
import digitalPeople from "../assets/digitalPeople.webp";
import ProjectCard from "../components/ProjectCard";
import useWindowSize from "../hooks/useWindowSize";
import { useQuery } from "@tanstack/react-query";
import newRequest from '../utils/newRequest'
const Home = () => {
  const [innerWidth, innerHeight] = useWindowSize();
  let slideNum = 5;
 if(innerWidth <= 1024 && innerWidth >= 930){
    slideNum = 3
 }else if(innerWidth < 930 && innerWidth > 677){
  slideNum = 2
 }else if(innerWidth < 677){
   slideNum = 1
 }

 const {isLoading, error, data} = useQuery({
  queryKey : ["randomGigs"],
  queryFn : () => {
    return newRequest(`/gigs/find/randomgig`).then(
      (res) => res.data
    );
  }
 })



  const contents = (heading, subHeading = null) => {
    return (
      <>
        <div className="flex items-center gap-2">
          <img className="w-6" src={check} alt="" />
          <h1 className="md:text-xl text-sm font-semibold ">{heading}</h1>
        </div>
        <p className="text-gray-500 text-sm md:text-[18px] leading-6 ">{subHeading}</p>
      </>
    );
  };
  return (
    <div>
      <Featured />
      <Trusted />
      <CardSlider slidesToShow={slideNum} arrowsScroll={slideNum}>
        {cards.map((card) => {
          return <CatCard key={card.id} item={card} />;
        })}
      </CardSlider>
      {/* Features */}
      <div className="bg-[#f1fdf7] p-[100px] flex justify-center">
        <div className="flex w-[1400px] flex-col-reverse md:flex-row  items-center gap-10 md:gap-[200px]">
          {/* left */}
          <div className="flex-2 flexflex-col gap-3">
            <h1 className="font-bold mb-4 text-xl md:text-[36px] leading-[120%] text-[#404145]">
              A whole world of freelance talent at your fingertips
            </h1>

            {contents(
              "The best for every budget",
              "Find high-quality services at every price point. No hourly rates, just project-based pricing."
            )}

            {contents(
              "Quality work done quickly",
              "   Find the right freelancer to begin working on your project within minutes."
            )}

            {contents(
              "Protected payments, every time",
              " Always know what you'll pay upfront. Your payment isn't released until you approve the work."
            )}

            {contents(
              "24/7 support",
              "Questions? Our round-the-clock support team is available to help  anytime, anywhere."
            )}
          </div>
          {/* right */}
          <div className="flex-3 lg:w-[50%] w-[320px]">
            <video className="w-[720px]" src={video} controls></video>
          </div>
        </div>
      </div>

      {/* Another feature */}
      <div className="bg-[#0d084d] p-[100px] text-white flex items-center   justify-center">
        <div className="flex md:w-[1400px] w-full flex-col-reverse md:flex-row justify-center items-center gap-12 md:gap-[150px]">
          {/* left */}
          <div className="md:flex-2 flex-1  lg:w-full w-[328px]  flex flex-col gap-3">
            <div className="flex items-center gap-8">
              <h1 className="font-bold text-[30px]">
                fiverr <span className="font-normal">Business.</span>
              </h1>
              <p className="bg-[#4d50dc] px-3 py-0 text-[10px] font-bold rounded-xl">
                New
              </p>
            </div>
            <h1 className="font-bold text-xl lg:text-2xl font-[Macan,Helvetica Neue,Helvetica,Arial,sans-serif]">
              A business solution designed for{" "}
              <i className="font-[DomaineDisplay]">teams</i>
            </h1>
            <p className=" text-[1rem] lg:text-[18px] mb-2 leading-[26px]">
              Upgrade to a curated experience packed with tools and benefits,
              dedicated to businesses
            </p>
            {contents("Connect to freelancers with proven business experience")}
            {contents(
              "Get matched with the perfect talent by a customer success manager"
            )}
            {contents(
              "Manage teamwork and boost productivity with one powerful workspace"
            )}
            <button className="bg-[#1dbf73] hover:bg-[#189f60] text-sm lg:text-lg font-bold px-4 py-2 mt-10 w-[max-content] rounded-md">
              Explore Fiverr Business
            </button>
          </div>
          {/* right */}
          <div className="flex-3 lg:w-[50%] w-[320px]">
            <img className="w-full" src={digitalPeople}  />
          </div>
        </div>
      </div>
 <div className="bg-[#f5f5f5]">
  
 {isLoading ? "loading please wait..." : error ? "Something went wrong..." : <CardSlider slidesToShow={slideNum} arrowsScroll={slideNum}>
          {data.map((gig) => {
            return <ProjectCard key={gig._id} project={gig} />;
          })}
        </CardSlider>}
 </div>
      </div>
  );
};

export default Home;
