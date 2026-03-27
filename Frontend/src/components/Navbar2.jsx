import React from 'react'
import { Link } from 'react-router-dom' // Essential for SPA navigation

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-10 py-4 bg-green-700 shadow-xl border-b-4 border-yellow-400">
      
      {/* Brand Logo - 7 Guys */}
      <Link to="/" className="flex items-center group">
        <h1 className="text-3xl font-black text-white tracking-tighter group-hover:scale-105 transition-transform">
          7 <span className="text-yellow-400">Guys</span>
        </h1>
      </Link>

      {/* Navigation Links - Centered */}
      <ul className="hidden md:flex items-center space-x-10 font-bold text-white uppercase tracking-wide text-sm">
        <li>
          <Link to="/view" className="hover:text-yellow-400 transition-colors">View</Link>
        </li>
        <li>
          <Link to="/addproduct" className="hover:text-yellow-400 transition-colors">Add Products</Link>
        </li>
        
      </ul>

    </nav>
  )
}

export default Navbar