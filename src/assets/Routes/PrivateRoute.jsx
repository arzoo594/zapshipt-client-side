import React, { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return (
      <div className=" items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner w-4 h-4"></span>
          <span className="loading loading-spinner w-6 h-6"></span>
          <span className="loading loading-spinner w-8 h-8"></span>
          <span className="loading loading-spinner w-10 h-10"></span>
          <span className="loading loading-spinner w-12 h-12"></span>
        </div>
      </div>
    );
  }
  if (!user) {
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  }
  return children;
};

export default PrivateRoute;
