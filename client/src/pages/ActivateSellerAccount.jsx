import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import getCurrentUser from "../utils/getCurrentUser";
import newRequest from "../utils/newRequest";

const ActivateSellerAccount = () => {
  const [isUserValid, setIsUserValid] = useState(false);
  const [username, setUsername] = useState("");
  const currentUser = getCurrentUser();
  const [password, setPassword] = useState("");
  const [isSeller, setIsSeller] = useState(false);
  const [error, setError] = useState("");
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();
  const handleSeller = (e) => {
    setIsSeller(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSeller) {
      try {
        const { data } = await newRequest.post("/auth/login", {
          username,
          password,
        });
        if (data.email === currentUser.email && data._id === currentUser._id) {
         
          setIsUserValid(true);
        } else {
          setError("Invalid credentials");
          setIsUserValid(false);
        }
      } catch (err) {
        setError(err?.response?.data);
        setIsUserValid(false);
      }
    } else {
      try {
        const { data } = await newRequest.patch(`/user/${currentUser?._id}`, {
          isSeller,
        });
        localStorage.setItem("currentUser", JSON.stringify(data));
        setAlert(true)
      setTimeout(() => {
        navigate("/");
        setAlert(false)
      }, 5000)
      } catch (err) {
        setError(err?.response?.data);
      }
    }
  };
  

  setTimeout(() => {
     setError("")
  }, 5000);

  return (

    <div
      className="flex items-center relative justify-center mt-12 p-4  
   "
    >
      <div className={`alert -top-10 ${!alert ? "opacity-0 -right-12" : "opacity-1 right-2" } transition-all   bg-green-900 text-white p-4 rounded-2xl shadow  shadow-stone-400 absolute`}>
        <h1>Congratulation your has been upgraded to seller account</h1>
      
      </div>
      <div className="flex mb-4 flex-col  gap-4 w-full md:w-[50%]">
        <h1 className="text-2xl text-gray-500 font-semibold">
          Before Activating your Seller Account <br /> Here is some test that
          you need to go through.
        </h1>
        <label htmlFor="">Username</label>
        <input
          type="text"
          className="p-4 border border-gray-500 rounded-xl"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          required
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          className="p-4 border border-gray-500 rounded-xl"
          name="password"
          id=""
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {isUserValid && (
          <div className="toggle flex gap-4">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch ">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>
        )}
        <button
          className="primary p-3 font-bold text-xl rounded-xl"
          onClick={handleSubmit}
        >
          {!isUserValid ? "Continue" : "Activate"}
        </button>
        {error && (
          <p className=" text-red-500 text-center font-bold text-sm">{error}</p>
        )}
      </div>
    </div>
  );
};

export default ActivateSellerAccount;
