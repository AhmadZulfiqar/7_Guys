import React from "react";
import Navbar from "../components/Navbar";
const Login = () => {
  return (
    <>
      <Navbar />
      <div className=" flex justify-center m-7  ">
        <div className="bg-green-800 h-110 w-100  px-10 pt-45 shadow-2xl  rounded-l-3xl  flex flex-col items-center gap-2">
          <h1 className="text-white font-bold text-5xl">7 <span className="text-yellow-400">Guys</span></h1>
          <p className="text-gray-200  italic">The Best Taste in Gujranwala</p>
        </div>
        <form action="">
        <div className="border-yellow-400 border-2 px-10 pt-5 h-110 w-100 p-4 shadow-2xl rounded-r-3xl">
          <h1 className="text-green-700 font-bold text-3xl">Login</h1>
          <p className="text-gray-600 pt-1 ">Please enter your details</p>
          <div className="flex flex-col gap-3 mt-5">
            <label htmlFor="email" className="text-green-700 font-bold">
              Email:
            </label>
            <input type="email" id="email" required className="border border-gray-300 rounded py-2 px-4" placeholder="Enter Your Email:" />
            <label htmlFor="password" className="text-green-700 font-bold">
              Password:
            </label>
            <input type="password" id="password" required placeholder="Enter Your Password:" className="border border-gray-300 rounded py-2 px-4" />
          </div>
          <button className="w-full mt-15 bg-green-700 hover:bg-green-800 text-white font-black py-3 rounded-xl shadow-lg transition-all active:scale-95 uppercase tracking-widest border-b-4 border-green-900">
            Login
          </button>
          <p className="text-gray-600 text-sm pt-2">
            Don't have an account? <a href="/signup" className="text-green-700 font-bold">Sign up</a>
          </p>
        </div>
        </form>
      </div>
    </>
  );
};

export default Login;
