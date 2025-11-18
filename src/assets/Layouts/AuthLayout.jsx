import React from "react";
import Logo from "../Components/Logo";
import { Outlet } from "react-router";
import authImage from "../Images/authImage.png";

const AuthLayout = () => {
  return (
    <div className="w-11/12 mx-auto p-6">
      <Logo />

      <div className="flex flex-col-reverse shadow-2xl lg:flex-row rounded-4xl items-center justify-center min-h-screen gap-10">
        <div className="flex-1 w-full">
          <Outlet />
        </div>

        <div className="flex-1 flex justify-center">
          <img
            src={authImage}
            alt=""
            className="w-full max-w-md object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
