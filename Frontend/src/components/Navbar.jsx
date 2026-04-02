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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Check if user is in localStorage on component load
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);
  let handleLogout = async () => {
    // 1. Clear the "notebook"
    localStorage.removeItem("user");
    // Optional: Inform the backend about logout
    // 2. Update the UI state immediately
    toast.info("You have been logged out."); // Optional: Show a logout toast message
    setIsLoggedIn(false);
    // 3. Redirect to home page
    navigate("/");
  };
  const [bucketItems, setBucketItems] = useState(0);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
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
        theme="light"
        transition={Bounce}
      />

      <nav className="sticky top-0 z-50 bg-green-700 shadow-xl border-b-4 border-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between py-4">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center group">
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tighter group-hover:scale-105 transition-transform">
              7 <span className="text-yellow-400">Guys</span>
            </h1>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center space-x-8 font-bold text-white uppercase tracking-wide text-sm">
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
          </ul>

          {/* Right Actions (Cart & Login) */}
          <div className="flex items-center gap-3">
            <Link
              to="/placeorder"
              className="bg-white hover:bg-yellow-400 text-green-700 font-extrabold py-2 px-4 md:px-6 rounded-full transition-all shadow-md active:scale-90 text-xs md:text-sm"
            >
              Bucket{bucketItems ? ` (${bucketItems})` : ""}
            </Link>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center gap-2">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => navigate("/profile")}
                    className="p-2 text-yellow-400 mt-1.5 hover:text-white"
                  >
                    <span className="material-symbols-outlined">
                      account_circle
                    </span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-yellow-400 mt-1.5 hover:text-white"
                  >
                    <span className="material-symbols-outlined">logout</span>
                  </button>
                </>
              ) : (
                <Link to="/login" className="text-yellow-400 mt-1.5 p-2">
                  <span className="material-symbols-outlined">login</span>
                </Link>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <button className="md:hidden text-white p-1" onClick={toggleMenu}>
              <span className="material-symbols-outlined text-3xl">
                {isMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Sidebar/Menu */}
        <div
          className={`md:hidden bg-green-800 border-t border-yellow-400 overflow-hidden transition-all duration-300 ${isMenuOpen ? "max-h-screen py-4" : "max-h-0"}`}
        >
          <ul className="flex flex-col items-center space-y-5 font-bold text-white uppercase text-sm">
            <li>
              <Link to="/" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/pizza" onClick={toggleMenu}>
                Pizzas
              </Link>
            </li>
            <li>
              <Link to="/burgers" onClick={toggleMenu}>
                Burgers
              </Link>
            </li>
            <li>
              <Link to="/drinks" onClick={toggleMenu}>
                Drinks
              </Link>
            </li>
            <li>
              <Link
                to="/deals"
                onClick={toggleMenu}
                className="text-yellow-400"
              >
                Hot Deals
              </Link>
            </li>

            <div className="flex gap-4 pt-4 border-t border-green-600 w-full justify-center">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => {
                      navigate("/profile");
                      toggleMenu();
                    }}
                    className="flex items-center gap-1 text-yellow-400"
                  >
                    <span className="material-symbols-outlined">
                      account_circle
                    </span>{" "}
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 text-yellow-400"
                  >
                    <span className="material-symbols-outlined">logout</span>{" "}
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={toggleMenu}
                  className="flex items-center gap-1 text-yellow-400"
                >
                  <span className="material-symbols-outlined">login</span> Login
                </Link>
              )}
            </div>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
