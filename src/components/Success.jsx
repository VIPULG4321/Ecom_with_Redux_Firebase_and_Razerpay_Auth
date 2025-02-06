import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Success() {
  const { id } = useParams();
  const [data, setDate] = useState([]);
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    const val = JSON.parse(localStorage.getItem("cart"));
    if (val) {
      console.log("val", val, val.length);
      setDate(val);
    } else {
      console.log("not vlaue");
    }
    localStorage.clear();
  }, []);

  const grandTotal = data.reduce((total, item) => total + item.price * item.quantity, 0);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl w-full">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <svg
              className="w-16 h-16 text-green-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-4">Payment Successful!</h2>
          <p className="text-gray-600 mt-2">Your payment has been accepted.</p>
          <p className="text-gray-800 font-medium mt-2">Order ID: <span className="text-blue-600">{id}</span></p>
        </div>

        {/* Ordered Items List */}
        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Ordered Items</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {data.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 shadow-md bg-white">
                <img
                  src={item.images}
                  alt={item.title}
                  className="w-full h-32 object-cover rounded-md"
                />
                <h4 className="text-lg font-semibold mt-2 text-gray-800">{item.title}</h4>
                <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                <p className="text-gray-800 font-medium">Price: ₹{item.price}</p>
                <p className="text-gray-800 font-medium">Quantity: {item.quantity}</p>
                <p className="text-green-600 font-bold">Total: ₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Grand Total & Continue Shopping */}
        <div className="mt-8 text-center">
          <h3 className="text-xl font-bold text-gray-800">
            Grand Total: <span className="text-green-700">₹{grandTotal.toFixed(2)}</span>
          </h3>
          <button
            onClick={() => window.location.href = "/"}
            className="mt-4 bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default Success;
