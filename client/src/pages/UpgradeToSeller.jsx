import React from "react";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";

const UpgradeToSeller = () => {
  useTitle("• Upgrade To Seller")
  return (
    <div className="flex justify-center">
      <div className="flex items-center lg:flex-row flex-col-reverse  mt-12 gap-12 w-full  lg:w-[1400px] justify-center">
        <div className="left flex-3 flex lg:p-0 p-2 flex-col gap-4">
          <div className="text-2xl font-bold  mb-4">
            <h1>Ready to start selling on Fiverr?</h1>
            <h1>Here’s the breakdown:</h1>
          </div>
          <div className="flex gap-2 mb-4">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9"
                />
              </svg>
            </div>
            <div>
              <h3>Learn what makes a successful profile</h3>
              <p>
                Discover the do's and don'ts to ensure you're always on the
                right track
              </p>
            </div>
          </div>
          <hr className="mb-2" />
          <div className="flex gap-2  mb-4">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div>
              <h3>Create your seller profile</h3>
              <p>
                Add your profile picture, description, and professional
                information.
              </p>
            </div>
          </div>
          <hr className="mb-2" />
          <div className="flex gap-2 mb-2">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </div>
            <div>
              <h3>Publish your Gig</h3>
              <p>
                Create a Gig of the service you’re offering and start selling
                instantly.
              </p>
            </div>
          </div>
          <hr className="mb-2" />
          <Link to={'/activate-seller-account'}>
          <button className="bg-[#1dbf73]  text-white hover:shadow w-full lg:w-[150px] p-2 rounded-sm">
            Continue
          </button>
          </Link>
        </div>
        <div className="right flex-4 lg:w-[500px] lg:ml-12 ml-0 lg:p-0 p-1 w-full">
          <video  autoPlay="" controls  loop >
            <source
              src="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/v1/video-attachments/generic_asset/asset/966b0ae895e85b526600eff1d21e3cf4-1674728725728/Seller%20onboarding%20video%20HQ"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </div>
  );
};

export default UpgradeToSeller;
