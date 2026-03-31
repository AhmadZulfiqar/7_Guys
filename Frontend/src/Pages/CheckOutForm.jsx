import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer,toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
const CheckOutForm = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState("");
  const [address, setAddress] = useState("");
  const checkoutdata = async (e) => {
  e.preventDefault();

  const persondetails = {
    name,
    email,
    phone,
    payment,
    address
  };

  try {
    const res = await axios.post('http://localhost:5000/persondetails', persondetails);
    console.log(res.data);

    // 1. Show the Toast first
    toast.success("🚀 Order placed! Redirecting to Home page | To view your order Please Login...", {
      position: "top-center",
      autoClose: 5000, // Toast disappears after 2 seconds
    });
    

    // 2. Set the Timeout to wait before navigating
    setTimeout(() => {
      navigate('/');
    }, 5000); // 2000 milliseconds = 2 seconds

  } catch (err) {
    console.log(err);
    toast.error("❌ Something went wrong. Please try again.");
  }
};
  return (
    <div className="min-h-screen bg-green-50">
      <ToastContainer />
      <div className="flex flex-col items-center justify-center p-6 md:p-12">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-green-800 uppercase tracking-tighter italic">
            Delivery <span className="text-yellow-500 underline decoration-4 underline-offset-8">Details</span>
          </h1>
          <p className="text-green-600 font-medium mt-3 uppercase text-xs tracking-widest">
            Almost there! Fill in your info for your 7 Guys order.
          </p>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl border-t-8 border-yellow-400">
          <form className="flex flex-col gap-5">
            
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-xs font-bold text-green-700 uppercase mb-1 ml-1">
                Full Name
              </label>
              <input 
                className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-200 focus:border-green-600 transition-all placeholder:text-gray-300" 
                type="text" 
                id="name" 
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-green-700 uppercase mb-1 ml-1">
                Email Address
              </label>
              <input 
                className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-200 focus:border-green-600 transition-all placeholder:text-gray-300" 
                type="email" 
                id="email" 
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-xs font-bold text-green-700 uppercase mb-1 ml-1">
                Phone Number
              </label>
              <input 
                className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-200 focus:border-green-600 transition-all placeholder:text-gray-300" 
                type="tel" 
                id="phone" 
                placeholder="03xx-xxxxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
                <label htmlFor="payment" className="block text-xs font-bold text-green-700 uppercase mb-1 ml-1">Payment Method</label>
                <select id="payment" className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-200 focus:border-green-600 transition-all" value={payment} onChange={(e) => setPayment(e.target.value)}>
                    <option value="">Select Payment Method</option>
                    <option value="cash">Cash on Delivery</option>
                </select>
            </div>
            {/* Shipping Address (New Field for Food Apps) */}
            <div>
              <label htmlFor="address" className="block text-xs font-bold text-green-700 uppercase mb-1 ml-1">
                Shipping Address
              </label>
              <textarea 
                className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-200 focus:border-green-600 transition-all resize-none" 
                id="address" 
                rows="3"
                placeholder="Where should we deliver your 7 Guys special?"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button className="mt-4 bg-green-700 hover:bg-green-800 text-white font-black py-4 rounded-xl shadow-lg transition-all active:scale-95 uppercase tracking-widest border-b-4 border-yellow-500" onClick={checkoutdata}>
              Complete Order
            </button>
          </form>
        </div>

        <p className="mt-6 text-[10px] text-gray-400 font-bold uppercase">
          7 Guys Gujranwala - Quality Food, Fast Delivery
        </p>
      </div>
    </div>
  );
};

export default CheckOutForm;