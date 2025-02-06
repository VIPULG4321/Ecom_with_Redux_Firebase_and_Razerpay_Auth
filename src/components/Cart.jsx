import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// auth 
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

const Cart = () => {
  const navigate = useNavigate();
  const [data, setDate] = useState([]);
  const cartItems = useSelector((state) => state.cart.items);

  // for auth 
  const [userDetails, setUserDetails] = useState(null);

  // check auth
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);

      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("User is not logged in");
      }
    });
  };

  // navigate login 
  const handleLogin = () => {
    navigate("/login");
  };

  console.log("userDetails : ",userDetails)

  useEffect(() => {
    const val = JSON.parse(localStorage.getItem("cart"));
    if (val) {
      console.log("val", val, val.length);
      setDate(val);
    } else {
      console.log("not vlaue");
    }
    fetchUserData();
  }, []);

  const grandTotal = data?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  console.log(Math.round(grandTotal));

  // for payment in razrpay 
  const paynow = () => {
    const options = {
      key: "rzp_test_um0VLGCPXk01H3",
      amount: Math.round(grandTotal) * 100,
      currency: "INR",
      method: {
        upi: true,
      },
      handler: function (response) {
        navigate(`/success/${response.razorpay_payment_id}`);
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  // deletes item
  const handleDelete = (id) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
  
    setDate(cart);
  };

  return (
    <div>
      {
        userDetails ? (
          <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Shopping Cart</h2>
      {data.length === 0 ? (
        <p className="text-gray-500 text-center">No items in cart</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.map((item) => (
            <div
              key={item.id}
              className="bg-white border rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300"
            >
              <img
                src={item.images}
                alt={item.title}
                className="w-full h-40 object-cover rounded-md"
              />
              <h4 className="text-lg font-semibold mt-2 text-gray-800">{item.title}</h4>
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">{item.description}</p>
              <div className="mt-3">
                <p className="text-gray-800 font-medium">Price: ₹{item.price}</p>
                <p className="text-gray-800 font-medium">Quantity: {item.quantity}</p>
                <p className="text-green-600 font-bold">Total: ₹{item.price * item.quantity}</p>
              </div>

              <button
                onClick={() => handleDelete(item.id)}
                className="w-2/3 mt-4 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
              >
                Delete Item
              </button>
            </div>
          ))}
        </div>
      )}
      {data.length > 0 && (
        <div className="mt-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800">
            Grand Total: <span className="text-green-700">₹{grandTotal.toFixed(2)}</span>
          </h3>

          <button
            onClick={paynow}
            className="mt-4 bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Pay Now
          </button>
        </div>
      )}
    </div>
        ) : (
          <div className="p-4 bg-blue-50 border border-blue-300 rounded-lg text-center">
            <p className="text-blue-600 text-sm flex items-center justify-center gap-1">
            User might not be registered? Please login first  
            <span 
              onClick={handleLogin} 
              className="text-blue-700 font-semibold cursor-pointer hover:underline"
            >
              Click here
            </span>
          </p>
  </div>
  
        )
      }
    </div>
    
  );
};

export default Cart;
