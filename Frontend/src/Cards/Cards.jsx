import React from "react";
import { useNavigate } from "react-router-dom";

const Cards = ({ product }) => {
  const navigate = useNavigate();
  
  const getorder = () => {
    navigate(`/orders/${product._id}`);
  };

  return (
    <>
      {/* 1. Added 'flex flex-col' to the main container */}
      <div className="w-full border-yellow-400 border-2 h-full rounded-xl bg-white overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer group flex flex-col">
        
        {/* Image Section */}
        <div className="h-40 overflow-hidden bg-gray-100 shrink-0">
          <img
            src={product.img_url}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
            alt={product.name}
          />
        </div>

        {/* 2. Added 'flex-grow' here. This pushes everything below it to the bottom */}
        <div className="p-3 flex-grow">
          <h2 className="text-green-700 font-bold text-lg group-hover:text-green-600 transition-colors tracking-tight italic">
            {product.name}
          </h2>
          <p className="text-sm text-gray-600 line-clamp-3">
            {product.description}
          </p>
        </div>

        {/* 3. This section is now locked to the bottom because of the flex-grow above */}
        <div className="mt-auto"> 
          <h1 className="pl-3 font-semibold text-xs text-gray-400 uppercase tracking-wider">
            Price
          </h1>
          <div className="flex justify-between items-center pl-3 pr-3 pb-3">
            <h2 className="font-black text-2xl text-green-700">
              Rs. {product.price}
            </h2>

            <button 
              className="bg-green-700 hover:bg-yellow-400 hover:text-green-900 text-white font-bold py-1.5 px-5 rounded-lg transition-colors shadow-md active:scale-95" 
              onClick={getorder}
            >
              Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;