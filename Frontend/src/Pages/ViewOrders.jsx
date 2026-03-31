import React from "react";
import Navbar from "../components/Navbar2";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    let getorders = async () => {
      await axios
        .get("http://localhost:5000/getorders")
        .then((res) => {
          console.log(res.data);
          setOrders(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getorders();
  }, []);
  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Order Management
        </h2>

        <div className="grid gap-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* --- Order Header: Customer Details --- */}
              <div className="bg-gray-50 p-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">
                <div>
                  <h3 className="font-bold text-lg text-blue-700">
                    {order.name}
                  </h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mt-1">
                    <span className="flex items-center gap-1">
                      📧 {order.email}
                    </span>
                    <span className="flex items-center gap-1">
                      📞 {order.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      📍 {order.address}
                    </span>
                  </div>
                </div>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {order.payment} on Delivery
                </div>
              </div>

              {/* --- Order Body: Items List --- */}
              <div className="p-4">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-gray-400 text-xs uppercase border-b">
                      <th className="pb-2 font-medium">Item Name</th>
                      <th className="pb-2 font-medium text-center">Qty</th>
                      <th className="pb-2 font-medium text-right">Price</th>
                      <th className="pb-2 font-medium text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {order.orderdetails.map((item, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 font-medium text-gray-700">
                          {item.name}
                        </td>
                        <td className="py-3 text-center text-gray-600">
                          {item.qty}
                        </td>
                        <td className="py-3 text-right text-gray-900 font-semibold">
                          Rs. {item.price}
                        </td>
                        <td className="py-3 text-right">
                          <select
                            className="text-sm border rounded-md p-1 bg-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                            defaultValue="Pending"
                          >
                            <option value="pending">⏳ Pending</option>
                            <option value="progress">⚙️ In Progress</option>
                            <option value="delivered">✅ Delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* --- Order Footer: Total Calculation --- */}
              <div className="bg-gray-50 p-3 px-6 text-right border-t">
                <span className="text-gray-500 text-sm mr-2">Order Total:</span>
                <span className="text-xl font-bold text-gray-900">
                  Rs.{" "}
                  {order.orderdetails.reduce(
                    (acc, curr) => acc + curr.price * curr.qty,
                    0,
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ViewOrders;
