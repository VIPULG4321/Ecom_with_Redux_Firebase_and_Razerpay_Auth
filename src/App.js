import "flowbite";
import React, { useEffect } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";

import Login from "./components/login";
import SignUp from "./components/register";

import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./components/Cart.jsx";
import { auth } from "./components/firebase";
import Navbar from "./components/Navbar.jsx";
import ProductDetails from "./components/ProductDetails.jsx";
import Products from "./components/products.jsx";
import Profile from "./components/profile";
import Success from "./components/Success.jsx";

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });
  return (
    <Router>
      <div className="App">
        <div className="">
          <div className="">
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={user ? <Navigate to="/products" /> : <Login />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/products" element={<Products />} />
              <Route path="/success/:id" element={<Success />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              {/* {" "} */}
            </Routes>
            <ToastContainer />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
