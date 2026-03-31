import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import History from "../components/History"; // Importing history for potential use in navigation
const ProfileUser = () => {
  const [userData, setUserData] = useState(null);
  const [history, setHistory] = useState([]);
  useEffect(() => {
    const getdetails = async () => {
      const savedUser = localStorage.getItem("user");
      if (!savedUser) {
        console.log("No user is currently logged in.");
      }
      const udata = JSON.parse(savedUser);
      try {
        const res = await axios.post("http://localhost:5000/loggedinuser", {
          email: udata.email,
        });
        console.log("User Data Retrieved from Local Storage:", udata);
        console.log("User Data Retrieved from Backend:", res.data);
        setUserData(res.data);
        setHistory(res.data.orderdetails || []); // Assuming history is part of the user data
      } catch (err) {
        if (err.response && err.response.status === 401) {
          console.warn("No user is currently logged in.");
          return;
        }
        if (err.response && err.response.status === 500) {
          console.error("No user data found in the database.");
        }
      }
    };
    getdetails();
  }, []);
  return (
    <>
      <Navbar />
      <div className="w-full flex items-center justify-center p-10 tracking-tight ">
        <div className="w-150 pb-10 border-yellow-400 border-2 pt-3 rounded-2xl shadow-2xl">
          <div className="flex flex-col items-center ">
            <h1 className="text-green-700 font-bold text-4xl tracking-tight">
              Welcome <span className="text-yellow-500 underline">Back!</span>
            </h1>
            <div className="mt-7 w-20 h-20 flex justify-center items-center font-bold text-white text-2xl rounded-full bg-green-700">
              <h1>{userData ? userData.name.charAt(0) : "Loading..."}</h1>
            </div>
            <p className="text-green-700 font-bold text-xl mt-5">
              Name: {userData ? userData.name : "Loading..."}
            </p>
            <p className="text-yellow-400 font-bold text-md">
              Email: {userData ? userData.email : "Loading..."}
            </p>
            <hr className="w-100 border-gray-300 my-4" />
            <h1 className="text-green-700 font-bold text-3xl mt-3">History</h1>
          </div>
          {history.length === 0 ? (
            <p className="text-gray-500 text-center mt-5">No order history found.</p>
          ) : null}
          <div>
            
            {history.map((item, idx) => (
              <History key={idx} order={item} />
            ))}
          </div>

          

        </div>
      </div>
    </>
  );
};

export default ProfileUser;
