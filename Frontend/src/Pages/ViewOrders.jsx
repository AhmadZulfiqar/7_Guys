import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar2";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";

const ViewOrders = () => {
  // Keep your existing state logic
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("Pending");

  // 1. UPDATE ORDER: Modified to use the arguments directly
  const updateorder = async (order) => {
    // Ensure we are using the most recent IDs and Status for THIS specific order
    const orderids = order.orderdetails.map((item) => item._id);
    
    console.log("Updating Order ID:", order._id);
    console.log("New Status:", order.userStatus);

    await axios.put(`http://localhost:5000/updateorder/${order._id}`, { 
        status: order.userStatus, 
        orderids: orderids 
    })
    .then((res) => {
      console.log("Order Updated Successfully:", res.data);
      toast.success(`Order Updated! | Status: ${selectedStatus}`);
    })
    .catch((err) => {
      console.error("Error Updating Order:", err.response?.data || err.message);
      toast.error("Error Updating Order");
    });
  };

  // 2. HANDLE CHANGE: This is where we fix the "selection not showing" issue
  const handleStatusChange = (order, newStatus) => {
    // A. Update the specific order in the orders list so the UI changes immediately
    const updatedOrders = orders.map((item) => {
      if (item._id === order._id) {
        return { ...item, userStatus: newStatus }; // Update status for this person
      }
      return item;
    });
    setOrders(updatedOrders);

    // B. Keep your existing logic for tracking selection
    let orderids = order.orderdetails.map((item) => item._id);
    setSelectedOrderId(orderids);
    setSelectedStatus(newStatus);
    
    console.log("User selected:", newStatus, "for items:", orderids);
  };

  useEffect(() => {
    const getorders = async () => {
      await axios
        .get("http://localhost:5000/getorders")
        .then((res) => {
          // Initialize userStatus from the first item's status in the database
          const initialized = res.data.map(o => ({
            ...o,
            userStatus: o.orderdetails[0]?.status || "Pending"
          }));
          setOrders(initialized);
        })
        .catch((err) => console.log(err));
    };
    getorders();
  }, []);

  return (
    <>
    <ToastContainer/>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Management</h2>

        <div className="grid gap-8">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 p-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">
                <div>
                  <h3 className="font-bold text-lg text-blue-700">{order.name}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mt-1">
                    <span>📧 {order.email}</span>
                    <span>📞 {order.phone}</span>
                    <span>📍 {order.address}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    className="text-sm border rounded-md p-1 bg-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                    // This now works because handleStatusChange updates the 'orders' state
                    value={order.userStatus}
                    onChange={(e) => handleStatusChange(order, e.target.value)}
                  >
                    <option value="Pending">⏳ Pending</option>
                    <option value="Progress">⚙️ In Progress</option>
                    <option value="Delivered">✅ Delivered</option>
                  </select>
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 text-sm font-medium"
                    onClick={() => updateorder(order)}
                  >
                    Update Status
                  </button>
                </div>
              </div>

              {/* --- Table Section --- */}
              <div className="p-4">
                <table className="w-full text-left border-collapse">
                  <tbody className="divide-y divide-gray-100">
                    {order.orderdetails.map((item, idx) => (
                      <tr key={idx}>
                        <td className="py-3 font-medium text-gray-700">{item.name}</td>
                        <td className="py-3 text-center text-gray-600">{item.qty}</td>
                        <td className="py-3 text-right text-gray-900 font-semibold">Rs. {item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ViewOrders;