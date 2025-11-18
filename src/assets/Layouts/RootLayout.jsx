import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";

const RouteLayout = () => {
  return (
    <div className="w-11/12  mx-auto">
      <Navbar></Navbar>
      <main className="min-h-[calc(100vh-245px)]">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default RouteLayout;
