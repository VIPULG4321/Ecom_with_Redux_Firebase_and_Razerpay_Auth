import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

// reducer 
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/searchSlice";

import SearchResults from "./SearchResults";

function Products() {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { filteredProducts, status } = useSelector((state) => state.search);

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
  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }
  const handleLogin = () => {
    navigate("/login");
  };


  return (
    <div>
      {userDetails ? (
        <>
          <SearchResults></SearchResults>
        </>
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

      )}
    </div>
  );
}
export default Products;
