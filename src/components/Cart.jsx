// src/components/Cart.js
import React from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);

  console.log("Cart Items:", cartItems);

  const grandTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">No items in cart</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cartItems.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 shadow-md">
              <img
                src={item.images}
                alt={item.title}
                className="w-full h-40 object-cover rounded-lg"
              />
              <h4 className="text-lg font-semibold mt-2">{item.title}</h4>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-gray-800 font-medium">Price: ${item.price}</p>
              <p className="text-gray-800 font-medium">Quantity: {item.quantity}</p>
              <p className="text-green-600 font-bold">
                Total: ${item.price * item.quantity}
              </p>
            </div>
          ))}
        </div>
      )}
      {cartItems.length > 0 && (
        <h3 className="text-xl font-bold mt-6">
          Grand Total: <span className="text-green-700">${grandTotal}</span>
        </h3>
      )}
    </div>
  );
};

export default Cart;
