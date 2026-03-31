import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
// IMPORTANT: You must import this CSS for the toast to look right!
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("http://localhost:5000/login", {
      email,
      password,
    });

    // 1. Store the user (Use lowercase 'user' to match your Navbar's getItem)
    localStorage.setItem("user", JSON.stringify(response.data.user));

    // 2. Show the Success Toast first
    toast.success("Welcome back to 7 Guys!");

    // 3. WAIT, then redirect. 
    // This allows the toast to show and then refreshes the Navbar.
    setTimeout(() => {
      window.location.href = "/"; 
    }, 1500); 

  } catch (error) {
    if (error.response && error.response.status === 401) {
      toast.error("Invalid email or password. | Sign Up to Create an Account.");
    } else {
      toast.error("Server error. Check if your Node backend is running.");
    }
    console.error("Error logging in:", error);
  }
};
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Navbar />
      <div className=" flex justify-center m-7  ">
        <div className="bg-green-800 h-110 w-100  px-10 pt-45 shadow-2xl  rounded-l-3xl  flex flex-col items-center gap-2">
          <h1 className="text-white font-bold text-5xl">
            7 <span className="text-yellow-400">Guys</span>
          </h1>
          <p className="text-gray-200  italic">The Best Taste in Gujranwala</p>
        </div>
        <div className="border-yellow-400 border-2 px-10 pt-5 h-110 w-100 p-4 shadow-2xl rounded-r-3xl">
          <h1 className="text-green-700 font-bold text-3xl">Login</h1>
          <p className="text-gray-600 pt-1 ">Please enter your details</p>
          <form action="" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3 mt-5">
              <label htmlFor="email" className="text-green-700 font-bold">
                Email:
              </label>
              <input
                type="email"
                id="email"
                required
                className="border border-gray-300 rounded py-2 px-4"
                placeholder="Enter Your Email:"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password" className="text-green-700 font-bold">
                Password:
              </label>
              <input
                type="password"
                id="password"
                required
                className="border border-gray-300 rounded py-2 px-4"
                placeholder="Enter Your Password:"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="w-full mt-15 bg-green-700 hover:bg-green-800 text-white font-black py-3 rounded-xl shadow-lg transition-all active:scale-95 uppercase tracking-widest border-b-4 border-green-900">
              Login
            </button>
          </form>
          <p className="text-gray-600 text-sm pt-2">
            Don't have an account?{" "}
            <button
              className="text-green-700 font-bold cursor-pointer"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
