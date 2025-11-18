import React from "react";
import logo from "../../assets/Images/logo.png";
const Logo = () => {
  return (
    <div className="flex">
      <img src={logo} alt="" />
      <h3 className="font-extrabold text-xl -ml-4 mt-4">ZapShift</h3>
    </div>
  );
};

export default Logo;
