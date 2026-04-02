import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';

const Order = () => {
  const navigation = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1); // Quantity state

  const getorder = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/orders/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.error("Order Failed:", err);
    }
  };
  let placeorder = async () => {
  let orderdetails = {
    // These keys MUST match your Order.js Schema exactly
    name: product.name,
    price: product.price,
    qty: qty,
    total: product.price * qty 
  };

  try {
    const res = await axios.post(`http://localhost:5000/placeorder`, orderdetails);
    console.log("Order Saved in DB:", res.data);
    toast.success("Order added to bucket! Check your Bucket.");
    setTimeout(() => {
      navigation("/"); // Navigate to success page
    }, 2500); // Wait for toast to show before navigating
    // You can navigate to a 'Success' page here
  } catch (err) {
    console.error("Order Error:", err.response?.data || err.message);
    toast.error("Failed to place order. Check console.");
  }
};
  

  useEffect(() => {
    getorder();
  }, [id]);

  // Handle Quantity Change
  const increaseQty = () => setQty(prev => prev + 1);
  const decreaseQty = () => setQty(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="min-h-screen bg-white">
      <ToastContainer/>
      <Navbar />
      
      <div className="max-w-8xl mx-auto px-5 py-4 flex flex-col md:flex-row gap-12 items-center">
        
        {/* Left Side: Image with Hover Effect */}
        <div className="w-full md:w-1/2 group">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl border-4 border-yellow-400 transform transition-transform group-hover:scale-[1.02] duration-500">
            <img 
              src={product.img_url} 
              alt={product.name} 
              className="w-full h-110 object-cover" 
            />
            <div className="absolute top-4 left-4 bg-green-700 text-white px-4 py rounded-full text-sm font-bold uppercase tracking-widest">
              {product.category || "7 Guys Special"}
            </div>
          </div>
        </div>

        {/* Right Side: Details & Actions */}
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-3xl md:text-5xl font-black text-green-800 uppercase tracking-tight italic">
            {product.name}
          </h1>
          
          <p className="text-sm text-gray-500 leading-relaxed w-full">
            {product.description || "Enjoy the authentic 7 Guys taste with our fresh ingredients and secret spices."}
          </p>

          <div className="h-1 w-20 bg-yellow-400 rounded-full"></div>

          <div className="space-y-1">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Price per unit</p>
            <p className="text-4xl font-black text-green-700">
              Rs. {product.price ? product.price.toLocaleString() : "0"}
            </p>
          </div>

          {/* QUANTITY CONTROLLER */}
          <div className="flex flex-col gap-3">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Select Quantity</p>
            <div className="flex items-center gap-6">
              <div className="flex items-center border-2 border-green-700 rounded-xl overflow-hidden shadow-sm">
                <button 
                  onClick={decreaseQty}
                  className="px-5 py-3 bg-white hover:bg-green-50 text-green-700 font-black text-xl transition-colors border-r-2 border-green-700"
                >
                  -
                </button>
                <span className="px-8 py-3 bg-white font-black text-2xl text-green-800">
                  {qty}
                </span>
                <button 
                  onClick={increaseQty}
                  className="px-5 py-3 bg-white hover:bg-green-50 text-green-700 font-black text-xl transition-colors border-l-2 border-green-700"
                >
                  +
                </button>
              </div>
              
              <div className="text-right">
                <p className="text-xs font-bold text-gray-400 uppercase">Total Bill</p>
                <p className="text-2xl font-black text-yellow-500">
                  Rs. {product.price ? (product.price * qty).toLocaleString() : "0"}
                </p>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4 ">
            <button className="flex-1 bg-green-700 hover:bg-green-800 text-white font-black py-5 rounded-2xl shadow-lg shadow-green-100 transition-all active:scale-95 uppercase tracking-widest border-b-4 border-green-900" onClick={placeorder}>
              Add to Bucket
            </button>
            
          </div>

        </div>
      </div>
    </div>
  );
};

export default Order;