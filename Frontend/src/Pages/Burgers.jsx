import React from 'react'
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Cards from '../Cards/Cards'

const Burgers = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    let getProducts = async () => {
      try {
        let res = await axios.get("http://localhost:5000/burgers");
        let data = await res.data;
        setProducts(data);
      } catch (err) {
        console.log(err);
      }
    };

    getProducts();
  }, []);
  return (
    <>
      <Navbar />
      <p className="text-center text-4xl p-3 text-green-700 font-bold">
        Welcome to 7 <span className="text-yellow-500">Guys!</span>
      </p>
      <h1 className="ml-13 text-2xl mb-4 font-bold text-green-700 border-b-4 border-yellow-400 inline-block">
        Burgers
      </h1>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-6 px-4 md:px-10  mx-auto justify-items-center">
        {products.map((product) => (
          <Cards key={product._id} product={product} />
        ))}
      </div>
    </>
  );
}

export default Burgers
