import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useTitle from "../hooks/useTitle";
import newRequest from "../utils/newRequest";
import upload from "../utils/upload";

const Register = () => {
  useTitle("• Register")
  const [file, setFile] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    isSeller: false,
    img: "",
    desc: "",
  });
  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

 
  
  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const url = await upload(file)
   try {
     const res = await newRequest.post('/auth/register', {...user, img : url});
    navigate()
   } catch (err) {
    
   }
  };
  return (
   <div className="flex flex-col mt-10">
    <div className="flex align-center  justify-center">
      <div
    
        className="w-[960px]  py-[50px] px-2 md:p-0 flex md:flex-row flex-col gap-[120px]"
      >
        <div className="left p-4 flex flex-col gap-4">
          <h1 className="text-3xl mb-4 text-gray-400 font-bold">
            Create a new account
          </h1>
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            className="input-control"
            placeholder="johndoe"
            onChange={handleChange}
          />
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            className="input-control"
            onChange={handleChange}
          />
          <label htmlFor="">Password</label>
          <input
            name="password"
            className="input-control"
            type="password"
            onChange={handleChange}
          />
          <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <label htmlFor="">Country</label>
          <input
            className="input-control"
            name="country"
            type="text"
            placeholder="Usa"
            onChange={handleChange}
          />
        
        </div>
        <div className="right p-4 flex flex-col gap-4">
          <h1 className="text-3xl mb-4 text-gray-400 font-bold">
            I want to become a seller
          </h1>
          <div className="toggle flex gap-4">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch ">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <input
            className="input-control"
            name="phone"
            type="text"
            placeholder="+1 234 567 89"
            onChange={handleChange}
          />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            className="p-4 border border-gray-400 rounded-md"
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>

      </div>
    </div>

  <button
      onClick={handleSubmit}
            className="rounded-xl w-[90%] md:w-[20%] mx-auto mt-10 primary p-5 text-xl font-semibold cursor-pointer"
            type="button"
          >
            Register
          </button>
  </div>

  );
};

export default Register;
