import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const ProfileLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet /> {/* This will render MyProducts or ProductDetails based on route */}
    </div>
  );
};

export default ProfileLayout;