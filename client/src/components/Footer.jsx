import React from "react";

const Footer = () => {
  const publicPath = "/img/";
  const pictures = [
    "facebookicon.png",
    "twitter.png",
    "instagram.png",
    "pinterest.png",
    "linkedin.png",
  ];
  const footerIcons = () => {
    return pictures.map((icon) => {
      return (
        <div key={icon}>
          {" "}
          <img
            className="w-[20px] h-[20px]"
            src={`${publicPath}${icon}`}
            alt=""
          />
        </div>
      );
    });
  };

  const categories =
    (title) =>
    (...args) => {
      return (
        <div className="flex flex-col items-center footer-el">
          <h2 className="font-bold text-xl mb-4 text-black">{title}</h2>
          {args.map((item, index) => {
            return (
              <div className={`mb-4 ${item.slice(0, 3)}-link`} key={index}>
                <span className="text-[#74767e]">{item}</span>
              </div>
            );
          })}
        </div>
      );
    };
  const footerIcon = (icon) => {
    return <img className="h-5 w-5" src={`${publicPath}${icon}`} />;
  };
  return (
    <div className="flex justify-center   text-[#999] my-[50px] mx-0">
      <div className="md:w-[1400px] w-full lg:px-0 px-2 ">
        {/* top */}
        <div className="flex md:flex-row flex-col md:items-start items-center  md:p-0 justify-center md:justify-between ">
          {categories("Categories")(
            "Digital Marketing",
            "Graphics & Design",
            "Writing & Translation",
            "Video & Animation",
            "Music & Audio",
            "Programming & Tech",
            "Data",
            "Business",
            "Lifestyle",
            "Photography",
            "Sitemap"
          )}
          {categories("About")(
            "Careers",
            "Press & News",
            "Partnerships",
            "Privacy Policy",
            "Terms of Service",
            "Intellectual Property Claims",
            "Investor Relations"
          )}
          {categories("Support")(
            "Help & Support",
            "Trust & Safety",
            "Selling on Fiverr",
            "Buying on Fiverr"
          )}

          {categories("Community")(
            "Customer Success  Stories",
            "Community hub",
            "Forum",
            "Events",
            "Blog",
            "Influencers",
            "Affiliates",
            "Podcast",
            "Invite a Friend",
            "Become a Seller",
            "Community Standards"
          )}

          {categories("More From Fiverr")(
            "Fiverr Business",
            "Fiverr Pro",
            "Fiverr Logo Maker",
            "Fiverr Guides",
            "Get Inspired",
            "Fiverr Select",
            "clear Voice",
            "Fiverr Workspace",
            "Learn",
            "Working Not Working"
          )}
        </div>
        <hr className=" border-gray-400 mb-8" />
        {/* bottom */}
        <div className="flex md:flex-row gap-4 p-2 flex-col justify-between">
          {/* left */}
          <div className="flex items-center gap-4">
            <h1 className="md:text-3xl text-2xl font-bold text-[#7b7e86]">fiverr.</h1>
            <span className="text-[#b5b6ba] text-sm">
              © Fiverr International Ltd. 2023
            </span>
          </div>

          {/* right */}
          <div className="flex  gap-4">
            <div className="flex gap-6">{footerIcons()}</div>

            <div className="md:flex gap-1 hidden justify-center">
              {footerIcon("language.png")}
              <span>English</span>
            </div>
            <div className="md:flex gap-1 hidden justify-center ">
              {footerIcon("coin.png")}
              <span>USD</span>
              {/* md:flex gap-1 hidden justify-center */}
            </div>
            <div className="md:flex gap-1 hidden justify-center">{footerIcon("accessibility.png")}</div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
