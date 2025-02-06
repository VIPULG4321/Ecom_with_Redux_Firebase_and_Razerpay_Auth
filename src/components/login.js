import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      
      // navigatetion to products page 
      window.location.href = "/products";
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);

      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
  <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
    <h3 className="text-2xl font-semibold text-center text-gray-800 mb-4">Login</h3>

    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 text-left">Email Address</label>
        <input
          type="email"
          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 text-left">Password</label>
        <input
          type="password"
          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Submit
      </button>

      <p className="text-sm text-center text-gray-600 mt-2">
        New user?{" "}
        <a href="/register" className="text-blue-600 hover:underline">
          Register Here
        </a>
      </p>
    </form>
  </div>
</div>

    
  );
}

export default Login;
