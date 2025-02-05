import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
// import Products from "./products";
import { useNavigate } from "react-router-dom";

// reducer 
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/searchSlice";

// serachresult 
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
        <p className="text-blue-500">User might not registered ? Please Login first <h6 onClick={handleLogin}>Click here</h6></p>
      )}
    </div>
  );
}
export default Products;
