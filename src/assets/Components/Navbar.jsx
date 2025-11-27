import React, { useContext } from "react";
import Logo from "./Logo";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "You have successfully logged out.",
          confirmButtonColor: "#4ade80",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Logout Failed",
          text: error.message,
          confirmButtonColor: "#f87171",
        });
      });
  };

  return (
    <div className="navbar shadow-lg border-l-4 border-l-primary rounded-lg bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink to="/services">Services</NavLink>
            </li>
            <li>
              <NavLink to="/coverage">Coverage</NavLink>
            </li>
            <li>
              <NavLink to="/about">About Us</NavLink>
            </li>
            <li>
              <NavLink to="/send-parcel">Send Parsel</NavLink>
            </li>
            <li>
              <NavLink to="/be-a-rider">Be a Rider</NavLink>
            </li>
            {user && (
              <>
                <li>
                  <NavLink to="/dasboard/my-parcels">My Parcels</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          <Logo />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/services">Services</NavLink>
          </li>
          <li>
            <NavLink to="/coverage">Coverage</NavLink>
          </li>
          <li>
            <NavLink to="/about">About Us</NavLink>
          </li>
          <li>
            <NavLink to="/send-parcel">Send Parsel</NavLink>
          </li>
          <li>
            <NavLink to="/be-a-rider">Be a Rider</NavLink>
          </li>
          {user && (
            <>
              <li>
                <NavLink to="/dasboard/my-parcels">My Parcels</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="navbar-end gap-1">
        {user ? (
          <Link onClick={handleLogOut} className="btn border border-primary">
            LogOut
          </Link>
        ) : (
          <Link to="/login" className="btn border border-primary">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
