import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Essential for SPA navigation
import img from "../../public/7_guys.jpg";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";

let bucketCount = 0;
let setBucketItemsRef = null;

export const getplaceorder = async () => {
  let res = await axios.get("http://localhost:5000/placeorder");
  bucketCount = res.data.length;
  setBucketItemsRef(bucketCount);
  console.log("Bucket Count:", bucketCount);
};

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is in localStorage on component load
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);
  let handleLogout = () => {
    // 1. Clear the "notebook"
    localStorage.removeItem("user");

    // 2. Update the UI state immediately
    toast.info("You have been logged out."); // Optional: Show a logout toast message
    setIsLoggedIn(false);
  };
  const [bucketItems, setBucketItems] = useState(0);

  setBucketItemsRef = setBucketItems;
  useEffect(() => {
    getplaceorder();
  }, []);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
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
      <nav className="sticky top-0 z-50 flex items-center justify-between pl-10 pr-5 py-4 bg-green-700 shadow-xl border-b-4 border-yellow-400">
        {/* Brand Logo - 7 Guys */}
        <Link to="/" className="flex items-center group">
          <h1 className="text-3xl font-black text-white tracking-tighter group-hover:scale-105 transition-transform">
            7 <span className="text-yellow-400">Guys</span>
          </h1>
        </Link>

        {/* Navigation Links - Centered */}
        <ul className="hidden md:flex items-center ml-45 space-x-10 font-bold text-white uppercase tracking-wide text-sm">
          <li>
            <Link to="/" className="hover:text-yellow-400 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/pizza"
              className="hover:text-yellow-400 transition-colors"
            >
              Pizzas
            </Link>
          </li>
          <li>
            <Link
              to="/burgers"
              className="hover:text-yellow-400 transition-colors"
            >
              Burgers
            </Link>
          </li>
          <li>
            <Link
              to="/drinks"
              className="hover:text-yellow-400 transition-colors"
            >
              Drinks
            </Link>
          </li>
          <li>
            <Link
              to="/deals"
              className="bg-yellow-400 text-green-800 px-3 py-1 rounded-md hover:bg-white transition-colors"
            >
              Hot Deals
            </Link>
          </li>
          <li></li>
        </ul>

        {/* Order Status / Cart Action */}
        <div className="flex items-center gap-2">
          <Link
            to="/placeorder"
            className="bg-white hover:bg-yellow-400 text-green-700 font-extrabold py-2 px-6 rounded-full transition-all shadow-md active:scale-90"
          >
            Bucket{bucketItems ? ` (${bucketItems})` : ""}
          </Link>
          {/* --- THE FIX --- */}
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <button className="flex items-center justify-center p-2 rounded-full hover:bg-white transition-colors hover:text-green-700 text-yellow-400"onClick={()=>{navigate("/profile")}}>
                <span className="material-symbols-outlined">account_circle</span>
              </button>
              <button 
                onClick={handleLogout}
                className="text-yellow-400 p-2 rounded-md hover:bg-white transition-colors hover:text-green-700 flex items-center"
              >
                <span className="material-symbols-outlined">logout</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-yellow-400 p-2 rounded-md hover:bg-white transition-colors hover:text-green-700 flex items-center"
            >
              <span className="material-symbols-outlined">login</span>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
