import React, { useState } from "react";
import axios from "axios";
import newRequest from "../utils/newRequest";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", { username, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate('/');
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  error &&
    setTimeout(() => {
      setError(null);
    }, 5000);

  return (
    <div
      className="flex items-center justify-center mt-12 p-4  
   "
    >
      <form
        className="flex mb-4 flex-col justify-center gap-4 w-full md:w-[20%]"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl text-gray-500 font-semibold">Sign in</h1>
        <label htmlFor="">Username</label>
        <input
          type="text"
          className="p-4 border border-gray-500 rounded-xl"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          className="p-4 border border-gray-500 rounded-xl"
          name="password"
          id=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="primary p-3 font-bold text-xl rounded-xl">
          Login
        </button>
        {error && (
          <p className=" text-red-500 text-center font-bold text-sm">{error}</p>
        )}
      </form>
    </div>
  );
};

export default Login;
