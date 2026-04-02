import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const CheckOutForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState("");
  const [address, setAddress] = useState("");
  
  // --- NEW STATE FOR LOADER ---
  const [loading, setLoading] = useState(false);

  const checkoutdata = async (e) => {
    e.preventDefault();
    
    // Basic validation to prevent empty submissions
    if(!name || !email || !address) {
        return toast.error("Please fill in all required fields!");
    }

    setLoading(true); // START LOADER

    const persondetails = { name, email, phone, payment, address };

    try {
      const res = await axios.post('http://localhost:5000/persondetails', persondetails);
      console.log(res.data);

      let isloggedin = localStorage.getItem("user") ? true : false;
      
      if (isloggedin) {
        toast.success("🚀 Order placed! Redirecting To your Profile...", {
          position: "top-center",
          autoClose: 4000,
        });
        setTimeout(() => navigate('/profile'), 4000);
      } else {
        toast.success("🚀 Order placed! Redirecting To login to view your order...", {
          position: "top-center",
          autoClose: 4000,
        });
        setTimeout(() => navigate('/login'), 4000);
      }
    } catch (err) {
      console.log(err);
      toast.error("❌ Something went wrong. Please try again.");
      setLoading(false); // STOP LOADER ONLY ON ERROR (on success we navigate away)
    }
  };

  return (
    <div className="min-h-screen bg-green-50">
      <ToastContainer />
      <div className="flex flex-col items-center justify-center p-6 md:p-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-green-800 uppercase tracking-tighter italic">
            Delivery <span className="text-yellow-500 underline decoration-4 underline-offset-8">Details</span>
          </h1>
          <p className="text-green-600 font-medium mt-3 uppercase text-xs tracking-widest">
            Almost there! Fill in your info for your 7 Guys order.
          </p>
        </div>

        <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl border-t-8 border-yellow-400">
          <form className="flex flex-col gap-5" onSubmit={checkoutdata}>
            
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-xs font-bold text-green-700 uppercase mb-1 ml-1">Full Name</label>
              <input 
                disabled={loading} // Disable inputs while loading
                className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-200 focus:border-green-600 transition-all disabled:bg-gray-100" 
                type="text" id="name" placeholder="Enter your name"
                value={name} onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-green-700 uppercase mb-1 ml-1">Email Address</label>
              <input 
                disabled={loading}
                className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-200 focus:border-green-600 transition-all disabled:bg-gray-100" 
                type="email" id="email" placeholder="example@mail.com"
                value={email} onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Phone and Payment logic remains same, added disabled={loading} to all */}
            <div>
              <label htmlFor="phone" className="block text-xs font-bold text-green-700 uppercase mb-1 ml-1">Phone Number</label>
              <input 
                disabled={loading}
                className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-200 focus:border-green-600 transition-all disabled:bg-gray-100" 
                type="tel" id="phone" placeholder="03xx-xxxxxxx"
                value={phone} onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div>
                <label htmlFor="payment" className="block text-xs font-bold text-green-700 uppercase mb-1 ml-1">Payment Method</label>
                <select disabled={loading} id="payment" className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-200 focus:border-green-600 transition-all disabled:bg-gray-100" value={payment} onChange={(e) => setPayment(e.target.value)}>
                    <option value="">Select Payment Method</option>
                    <option value="cash">Cash on Delivery</option>
                </select>
            </div>

            <div>
              <label htmlFor="address" className="block text-xs font-bold text-green-700 uppercase mb-1 ml-1">Shipping Address</label>
              <textarea 
                disabled={loading}
                className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-200 focus:border-green-600 transition-all resize-none disabled:bg-gray-100" 
                id="address" rows="3" placeholder="Where should we deliver?"
                value={address} onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </div>

            {/* --- UPDATED SUBMIT BUTTON --- */}
            <button 
              type="submit"
              disabled={loading}
              className={`mt-4 flex items-center justify-center gap-2 font-black py-4 rounded-xl shadow-lg transition-all uppercase tracking-widest border-b-4 
                ${loading 
                  ? "bg-gray-400 border-gray-500 cursor-not-allowed" 
                  : "bg-green-700 hover:bg-green-800 text-white border-yellow-500 active:scale-95"
                }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                "Complete Order"
              )}
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