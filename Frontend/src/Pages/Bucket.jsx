import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { getplaceorder } from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Bucket = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  let getdata = async () => {
    let res = await axios.get("http://localhost:5000/placeorder");
    setOrders(res.data);
    console.log(res.data);
  };
  useEffect(() => {
    getdata();
  }, []);
  let deleteorder = async (id) => {
    await axios.delete(`http://localhost:5000/deleteorder/${id}`);
    getdata(); // Refresh the list after deletion
    getplaceorder(); // Update bucket count
  }
  let compeleteorder =async () => {
    if(orders.length === 0){
      alert("Your bucket is empty! Please add items before checking out.");
      return;
    }
    await axios.post('http://localhost:5000/checkout', orders)
    .then((res)=>{
      console.log(res.data)
    })
    navigate("/checkout");
  }
  return (
    <>
      <Navbar />
      <div className="bg-green-50 min-h-screen p-4 md:p-10">
        {/* Header */}
        <h1 className="text-4xl p-6 text-green-700 font-black text-center uppercase tracking-tight">
          Check{" "}
          <span className="text-yellow-500 underline decoration-4 underline-offset-4">
            Out
          </span>
        </h1>

        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          {/* Product Item Row (Repeat this for each item) */}
          {orders.map((order,idx)=>(
            <div key={idx} className="flex items-center justify-between bg-white w-full p-5 rounded-xl shadow-sm border-l-8 border-green-700">
            <div className="flex-1">
              <h1 className="text-lg font-bold text-green-800 uppercase">
                {order.name || "7 Guys Special"}
              </h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase">
                Quantity: {order.qty}
              </p>
            </div>

            <div className="text-right flex items-center gap-6">
              <h1 className="font-black text-green-700 text-xl">Rs.{order.price * order.qty}</h1>
              <button 
                className="bg-red-50 hover:bg-red-600 text-red-600 hover:text-white px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all"
                onClick={() => deleteorder(order._id)}
              >
                Delete
              </button>
            </div>
          </div>
          
          ))}
          {/* --- TOTAL SUMMARY SECTION --- */}
          <div className="mt-4 bg-white p-6 rounded-2xl shadow-lg border-t-8 border-yellow-400">
            <div className="space-y-2">
              <div className="flex justify-between text-gray-500 font-bold uppercase text-xs">
                <span>Subtotal</span>
                <span>Rs. {orders.reduce((total, order) => total + (order.price * order.qty), 0)}</span>
              </div>
              <div className="flex justify-between text-gray-500 font-bold uppercase text-xs">
                <span>Delivery Fee</span>
                <span className="text-green-600">Free</span>
              </div>
            
              {/* Decorative Divider */}
              <div className="border-t-2 border-dashed border-gray-100 my-4"></div>

              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black text-green-800 uppercase tracking-tighter">
                  Grand Total
                </h2>
                <h2 className="text-3xl font-black text-green-700">Rs. {orders.reduce((total, order) => total + (order.price * order.qty), 0)}</h2>
              </div>
            </div>

            {/* Final Action Button */}
            <button className="w-full mt-6 bg-green-700 hover:bg-yellow-400 hover:text-green-900 text-white font-black py-4 rounded-xl shadow-lg transition-all active:scale-95 uppercase tracking-widest border-b-4 border-green-900"onClick={compeleteorder}>
              Confirm Order
            </button>
          </div>

          {/* Footer Brand */}
          <p className="text-center text-[10px] text-gray-400 font-bold uppercase mt-4">
            7 Guys - Quality You Can Taste
          </p>
        </div>
      </div>
      
    </>
  );
};

export default Bucket;
