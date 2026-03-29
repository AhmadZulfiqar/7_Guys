import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
    const handelSubmit = async (e) => {
      e.preventDefault()
      try{
        let response = await axios.post('http://localhost:5000/signup', {
          username,
          email,
          password
        })
        if(response.status === 401){
          alert("Signup failed! Please try again.")
        }

        navigate('/login')
      } catch (error) {
        console.error('Error signing up:', error)
      }
    }

  
  return (
    <>
      <Navbar />
      <div className=" flex justify-center m-7  ">
        <div className="bg-green-800 h-112 w-100  px-10 pt-45 shadow-2xl  rounded-l-3xl  flex flex-col items-center gap-2">
          <h1 className="text-white font-bold text-5xl">7 <span className="text-yellow-400">Guys</span></h1>
          <p className="text-gray-200  italic">The Best Taste in Gujranwala</p>
        </div>
        <form action="" onSubmit={handelSubmit}>
        <div className="border-yellow-400 border-2 px-10 pt-5 h-112 w-100 p-4 shadow-2xl rounded-r-3xl">
          <h1 className="text-green-700 font-bold text-3xl"> <span className="text-yellow-500">Create</span> Account</h1>
          <p className="text-gray-600 pt-1 ">Please enter your details</p>
          <div className="flex flex-col gap-2 mt-2">
            <label htmlFor="username" className="text-green-700 font-bold">
              Username:
            </label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} id="username" required className="border border-gray-300 rounded py-2 px-4" placeholder="Enter Your Username:" />
            <label htmlFor="email" className="text-green-700 font-bold">
              Email:
            </label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" required className="border border-gray-300 rounded py-2 px-4" placeholder="Enter Your Email:" />
            <label htmlFor="password" className="text-green-700 font-bold">
              Password:
            </label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" required placeholder="Enter Your Password:" className="border border-gray-300 rounded py-2 px-4" />
          </div>
          <button type='submit' className="w-full mt-5 bg-green-700 hover:bg-green-800 text-white font-black py-3 rounded-xl shadow-lg transition-all active:scale-95 uppercase tracking-widest border-b-4 border-green-900">
            Create Account
          </button>
          <p className="text-gray-600 text-sm pt-2">
            Already have an account? <button className="text-green-700 font-bold cursor-pointer" onClick={()=>{navigate("/login")}}>Login</button>
          </p>
        </div>
        </form>
      </div>
    </>
  )
}

export default Signup