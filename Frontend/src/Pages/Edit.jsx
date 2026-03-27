import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar2 from '../components/Navbar2'

const Edit = () => {
    const [productName, setProductName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    
    const { id } = useParams()
    const navigation = useNavigate()

    // 1. Fetch Data on Load
    useEffect(() => {
        axios.get(`http://localhost:5000/products/${id}`)
            .then((res) => {
                setProductName(res.data.name)
                setPrice(res.data.price)
                setCategory(res.data.category)
                setDescription(res.data.description)
                setImageUrl(res.data.img_url)
            })
            .catch((error) => {
                console.error("Error fetching product:", error)
            })
    }, [id])

    // 2. Update Function
    const handleUpdate = async (e) => {
        e.preventDefault() // Prevents page reload
        
        const updatedProduct = {
            name: productName,
            price: parseFloat(price),
            category: category,
            description: description,
            img_url: imageUrl
        }

        try {
            const res = await axios.put(`http://localhost:5000/update_product/${id}`, updatedProduct)
            console.log("Update Success:", res.data)
            navigation('/view') 
        } catch (err) {
            console.error("Update Failed:", err)
            alert("Check if your Backend Route is '/update_product/:id'")
        }
    }

    return (
        <>
            <Navbar2 />
            <div className="min-h-screen bg-green-50 flex items-center justify-center p-6">
                <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border-t-8 border-yellow-400 p-8">
                    
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-black text-green-800 uppercase tracking-tight">
                            Edit <span className="text-yellow-500">Product</span>
                        </h1>
                        <p className="text-gray-500 text-sm mt-2">Update the details of this 7 Guys item</p>
                    </div>

                    {/* Use onSubmit here instead of onClick on button */}
                    <form className="space-y-5" onSubmit={handleUpdate}>
                        
                        <div>
                            <label className="block text-xs font-bold text-green-700 uppercase mb-1 ml-1">Product Name</label>
                            <input 
                                type="text" 
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 outline-none"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-green-700 uppercase mb-1 ml-1">Price (PKR)</label>
                                <input 
                                    type="number" 
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 outline-none"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-green-700 uppercase mb-1 ml-1">Category</label>
                                <select 
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 outline-none bg-white"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                >
                                    <option value="">Select...</option>
                                    <option value="Pizza">Pizza</option>
                                    <option value="Burger">Burger</option>
                                    <option value="Fries">Fries</option>
                                    <option value="Nuggets">Nuggets</option>
                                    <option value="Drinks">Drinks</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-green-700 uppercase mb-1 ml-1">Description</label>
                            <textarea 
                                rows="3"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 outline-none resize-none"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-green-700 uppercase mb-1 ml-1">Image URL</label>
                            <input 
                                type="text" 
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 outline-none"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                required
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="w-full bg-green-700 hover:bg-green-800 text-white font-black py-4 rounded-xl shadow-lg transition-all active:scale-95 mt-4 border-b-4 border-yellow-500"
                        >
                            UPDATE 7 GUYS ITEM
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Edit