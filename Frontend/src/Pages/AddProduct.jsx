import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar2 from '../components/Navbar2'

const AddProduct = () => {
    const [productName, setProductName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const navigation = useNavigate()
    let addproduct=async(e)=>{
        e.preventDefault()
        let newProduct={
            name: productName,
            price: parseFloat(price),
            category: category,
            description: description,
            img_url: imageUrl
        }
        await axios.post('http://localhost:5000/addproducts', newProduct)
        .then((res)=>{
            console.log(res.data)
            navigation('/view') // Redirect to the View page after successful addition
        })
        .catch((err)=>{
            console.log(err)
        })
    }
  return (
    <>
    <Navbar2 />
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border-t-8 border-yellow-400 p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-green-800 uppercase tracking-tight">
            Add New <span className="text-yellow-500">Product</span>
          </h1>
          <p className="text-gray-500 text-sm mt-2">Enter details to update the 7 Guys menu</p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          
          {/* Product Name */}
          <div>
            <label className="block text-xs font-bold text-green-700 uppercase mb-1 ml-1">Product Name</label>
            <input 
              type="text" 
              placeholder="e.g. 7-Cheese Classic" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>

          {/* Row: Price & Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-green-700 uppercase mb-1 ml-1">Price (PKR)</label>
              <input 
                type="number" 
                placeholder="1299" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-green-700 uppercase mb-1 ml-1">Category</label>
              <select 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-white cursor-pointer"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select...</option>
                <option value="Pizza">Pizza</option>
                <option value="Burger">Burgers</option>
                <option value="Fries">Fries</option>
                <option value="Nuggets">Nuggets</option>
                <option value="Drinks">Drinks</option>
                <option value="Wings">Wings</option>
                <option value="Deals">Deals</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-green-700 uppercase mb-1 ml-1">Description</label>
            <textarea 
              placeholder="What's inside this 7 Guys special?" 
              rows="3"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs font-bold text-green-700 uppercase mb-1 ml-1">Image URL</label>
            <input 
              type="text" 
              placeholder="https://image-link.com/pizza.jpg" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-green-700 hover:bg-green-800 text-white font-black py-4 rounded-xl shadow-lg shadow-green-100 transition-all active:scale-[0.98] mt-4 border-b-4 border-yellow-500"
            onClick={addproduct}
          >
            CONFIRM & ADD TO MENU
          </button>
        </form>

      </div>
    </div>
    </>
  )
}

export default AddProduct