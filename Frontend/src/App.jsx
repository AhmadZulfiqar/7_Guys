import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import "./App.css";
import Pizza from "./Pages/Pizza";
import Burgers from "./Pages/Burgers";
import Deals from "./Pages/Deals";
import AddProduct from "./Pages/AddProduct";
import View from "./Pages/View";
import Edit from "./Pages/Edit";
import Bucket from "./Pages/Bucket";
import Order from "./components/Order";
import Drinks from "./Pages/Drinks";
import Checkout from "./Pages/CheckOutForm";
import PersonalDetails from "./Pages/PersonalDetails";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ProfileUser from "./Pages/ProfileUser";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pizza" element={<Pizza />} />
      <Route path="/burgers" element={<Burgers />} />
      <Route path="/deals" element={<Deals />} />
      <Route path="/addproduct" element={<AddProduct />} />
      <Route path="/view" element={<View />} />
      // In your App.js
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/orders/:id" element={<Order />} />
      <Route path="/placeorder" element={<Bucket />} />
      <Route path="/drinks" element={<Drinks />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/deluser" element={<PersonalDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<ProfileUser />} />
    </Routes>
  );
};

export default App;
