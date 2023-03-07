import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import getCurrentUser from "../utils/getCurrentUser";
import newRequest from "../utils/newRequest";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const { pathname } = useLocation();
  const currentUser = getCurrentUser();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  let activeClass =
    "transition-all  z-[999] sticky top-0 ease-in duration-200  md:p-0 p-1 flex flex-col items-center";
  if (!active && pathname === "/") {
    activeClass += "  text-white bg-[#003c1a] ";
  } else {
    activeClass += " bg-white text-black ";
  }

  //* logout functionality
  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.removeItem("currentUser");
      navigate("/");
    } catch (err) {}
  };
  const links = (text) => (
    <span className="lg:flex hidden text-[1rem]">{text}</span>
  );

  let responsiveBarClass = "";
  if (show && innerWidth < 768) {
    responsiveBarClass =
      "flex flex-col  p-4 md:py-3 transition-all duration-300 ease-in md:flex-row gap-4 text-gray w-full w-[1400px] justify-between font-[300] links";
  } else {
    responsiveBarClass =
      "hidden md:flex flex-col   p-4 md:px-2 md:flex-row gap-4  text-gray w-full 2xl:w-[1400px] justify-between   lg:justify-between font-[300] links ";
  }
  return (
    <div className={activeClass}>
      <div className="flex items-center justify-between py-5 w-full 2xl:w-[1400px]  w-full lg:px-0 px-2">
        {/* logo */}
        <div className="text-xl font-bold md:text-2xl ">
          <Link to="/">
            <span className="text-2xl lg:text-3xl">fiverr</span>
            <span className="text-green-500">.</span>
          </Link>
        </div>
        {/* links */}
        <div className="links flex gap-4 md:gap-8 font-semibold items-center">
          {links("Fiverr Business")}
          <Link to={"/explore"}>
            <span className="md:text-[1rem] text-sm ">Explore</span>
          </Link>
          {links("English")}
          {!currentUser && (
            <Link to={"/login"}>
              <span className="md:text-[1rem] text-sm">Sign in</span>
            </Link>
          )}
          {!currentUser?.isSeller && currentUser && (
            <Link to={"/upgrade-to-seller"}>
              <span className="md:text-[1rem] text-sm">Become a Seller</span>
            </Link>
          )}
          {!currentUser && (
            <Link to={"/register"}>
              {" "}
              <button
                type="button"
                className={` ${
                  !active
                    ? "text-white border-white"
                    : "text-black border-green-500"
                } navButton py-2 px-6 rounded-md border border-white cursor-pointer`}
              >
                join
              </button>
            </Link>
          )}

          {currentUser && (
            <>
              <div
                className="flex items-center gap-3 cursor-pointer relative"
                onClick={() => setOpen(!open)}
              >
                <img
                  src={currentUser?.img || "/img/noavatar.jpg"}
                  alt={currentUser.username}
                  className="md:w-12 md:h-12 h-8 w-8 rounded-full object-cover"
                />
                <span className="lg:block hidden">{currentUser.username}</span>
                {open && (
                  <div className="absolute w-[200px] transition-all ease-in duration-500 flex top-14 gap-4 z-50 border flex-col rounded-md shadow bg-white text-gray-400 p-5 right-0">
                    {currentUser.isSeller && (
                      <div className="flex gap-4 flex-col">
                        <Link to={"/mygigs"}>Gigs</Link>
                        <Link to={"/add"}>Add New Gig</Link>
                      </div>
                    )}
                    <Link to={"/orders"}>Orders</Link>
                    <Link to={"/messages"}>Messages</Link>
                    <Link onClick={handleLogout}>Logout</Link>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {(active || pathname !== "/") && (
        <>
          <hr
            className="text-white w-full h-0"
            style={{
              border: "1px solid lightgray",
            }}
          />

          <div className="bg-green-400 text-white p-4 rounded-full absolute md:hidden block top-20 right-1 ">
            {!show && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                onClick={() => setShow(true)}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                />
              </svg>
            )}
            {show && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                onClick={() => setShow(false)}
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </div>

          <div className={responsiveBarClass}>
            <Link to={"/gigs?cat=design"}>Graphics & Design</Link>
            <Link to={"/gigs?cat=marketing"}>Digital Marketing</Link>
            <Link to="/gigs?cat=translations">Writing & Translations</Link>
            <Link to={"/gigs?cat=animation"}>Video & Animation</Link>

            <Link to={"/gigs?cat=ai"}>AI Services</Link>
          </div>
          <hr
            className="text-white w-full h-0"
            style={{
              border: "1px solid lightgray",
            }}
          />
        </>
      )}
    </div>
  );
};

export default Navbar;
