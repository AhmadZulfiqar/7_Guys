import React from "react";

const History = ({ order }) => {
  const dateview = () => {
    // 1. Convert the ISO string into a proper JavaScript Date object
    const dateObj = new Date(order.createdAt);

    // 2. Extract local components (JS automatically applies your +5 offset)
    const date = dateObj.toLocaleDateString('en-GB'); // "DD/MM/YYYY"
    
    let hours = dateObj.getHours(); // Gets local hours (0-23)
    const mins = dateObj.getMinutes().toString().padStart(2, '0'); // Ensures 2 digits
    const ampm = hours >= 12 ? "PM" : "AM";

    // 3. Convert 24-hour to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    return { date, hours, mins, ampm };
  };

  const { date, hours, mins, ampm } = dateview();
  return (
    <div className="m-5 flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4 border-l-green-600">
      {/* Left Section: Item Info */}
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-gray-800 tracking-tight">
          {order.name}
        </h1>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs font-bold rounded-md uppercase">
            Qty: {order.qty}
          </span>
          <span className="text-yellow-500 text-sm font-bold italic">{order.status}</span>
        </div>
      </div>

      {/* Right Section: Price & Meta */}
      <div className="flex flex-col items-end justify-between gap-2">
        <p className="text-lg font-extrabold text-green-700">
          Rs. {order.price}
        </p>
        <div className="flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {order.createdAt.substring(0, 10)} {/* Displays only the date part */ }

          <span class="material-symbols-outlined font-light pl-1 ">
            schedule
          </span>

          {dateview().hours}:{dateview().mins} {dateview().ampm}
        </div>
      </div>
    </div>
  );
};

export default History;
