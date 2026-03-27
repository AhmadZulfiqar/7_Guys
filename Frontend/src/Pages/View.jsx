import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar2 from "../components/Navbar2"; // Ensure the name matches your file

const View = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // 1. Fetch all products from your Local MongoDB
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProducts();
  }, []);

  // 2. Delete Logic (Matches your delete_products/:id route)
  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this 7 Guys item?")) {
      try {
        await axios.delete(`http://localhost:5000/delete_products/${id}`);
        // Remove from UI immediately without reloading
        setProducts(products.filter((p) => p._id !== id)); 
      } catch (error) {
        alert("Error deleting product. Check if backend is running.");
      }
    }
  };

  // 3. Edit Logic (Optimized: No extra API call needed)
  // 3. Edit Logic (Now showing ID in the URL)
  const handleEdit = (product) => {
    // This will change the URL to: localhost:3000/edit/65f123abc...
    navigate(`/edit/${product._id}`, { state: { product } });
  };

  return (
    <div className="min-h-screen bg-green-50">
      <Navbar2 />
      
      <div className="p-6 md:p-12">
        {/* Header Section */}
        <div className="max-w-5xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-green-800 uppercase tracking-tighter text-center md:text-left">
              Product <span className="text-yellow-500 underline decoration-4 underline-offset-8">Inventory</span>
            </h1>
            <p className="text-green-600 font-medium mt-2 text-center md:text-left">
              Manage your 6 Pizzas, 4 Burgers, and more.
            </p>
          </div>
          <div className="bg-white px-6 py-3 rounded-xl border-b-4 border-yellow-400 shadow-md text-green-800 font-bold">
            Total Items: {products.length}
          </div>
        </div>

        {/* Main List Container */}
        <div className="max-w-5xl mx-auto flex flex-col gap-4">
          
          {/* Table Header (Hidden on Mobile) */}
          <div className="hidden md:flex justify-between items-center bg-green-700 text-white p-5 rounded-xl shadow-lg font-bold uppercase text-xs tracking-widest">
            <h1 className="w-1/3">Product Details</h1>
            <h1 className="w-1/4 text-center">Price</h1>
            <h1 className="w-1/4 text-center">Category</h1>
            <h1 className="w-1/4 text-right pr-4">Actions</h1>
          </div>

          {/* Dynamic Product List */}
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="flex flex-col md:flex-row justify-between items-center bg-white p-5 rounded-xl shadow-sm border-l-8 border-green-600 hover:shadow-md hover:border-yellow-400 transition-all group"
              >
                {/* 1. Name & Category Badge */}
                <div className="w-full md:w-1/3 mb-3 md:mb-0">
                  <h1 className="font-black text-green-900 text-lg uppercase truncate">
                    {product.name}
                  </h1>
                  <span className="inline-block text-[10px] bg-green-100 text-green-700 px-3 py-1 rounded-full uppercase font-bold mt-1">
                    {product.category || "General"}
                  </span>
                </div>

                {/* 2. Price Section */}
                <div className="w-full md:w-1/4 text-center mb-3 md:mb-0">
                  <h1 className="font-bold text-xl text-green-700">
                    <span className="text-xs text-gray-400 mr-1 text-sm font-normal">PKR</span>
                    {product.price.toLocaleString()}
                  </h1>
                </div>

                {/* 3. Category Label (Desktop only) */}
                <div className="hidden md:block w-1/4 text-center text-gray-500 font-bold italic">
                  {product.category}
                </div>

                {/* 4. Action Buttons */}
                <div className="w-full md:w-1/4 flex justify-end gap-3 border-t md:border-t-0 pt-3 md:pt-0">
                  <button 
                    onClick={() => handleEdit(product)}
                    className="flex-1 md:flex-none bg-gray-100 hover:bg-yellow-400 text-gray-600 hover:text-green-900 font-bold py-2 px-6 rounded-lg text-sm transition-all active:scale-90"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="flex-1 md:flex-none bg-red-50 hover:bg-red-600 text-red-600 hover:text-white font-bold py-2 px-6 rounded-lg text-sm transition-all active:scale-95 shadow-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            /* Empty State for your BSIT Lab */
            <div className="text-center py-24 bg-white rounded-3xl border-4 border-dashed border-green-100">
               <h2 className="text-green-200 font-black text-3xl uppercase">Kitchen Empty!</h2>
               <p className="text-gray-300 mt-2">Add your first Pizza or Burger to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default View;