import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();
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
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-10 text-center">
      <h3 className="text-2xl font-bold text-gray-800">Welcome, {userDetails.firstName} 👋</h3>

      {/* User Informations */}
      <div className="mt-4 bg-gray-100 p-4 rounded-md">
        <p className="text-gray-700 text-lg text-left">
          <span className="font-semibold">Email:</span> {userDetails.email}
        </p>
        <p className="text-gray-700 text-lg text-left">
          <span className="font-semibold">First Name:</span> {userDetails.firstName}
        </p>
        <p className="text-gray-700 text-lg text-left">
          <span className="font-semibold">Last Name:</span> {userDetails.lastName}
        </p>
      </div>
      
      <button
        onClick={handleLogout}
        className="mt-6 px-5 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
      >
        Logout
      </button>
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

      )}
    </div>
  );
}
export default Profile;
