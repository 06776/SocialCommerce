import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AdminHeader = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div className="flex items-left">
        <Link to="/">
          <img
            src={require("../../Assets/socialcommerce_logo.png")}
            alt="Store logo"
            width="180"
            height="180"
          />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <div className="flex items-right mr-6">
            <b>Admin</b>
          </div>
          <img
            src={`${user?.avatar?.url}`}
            alt=""
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
