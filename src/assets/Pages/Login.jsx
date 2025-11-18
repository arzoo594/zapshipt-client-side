import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Contexts/AuthContext";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUserFunc } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const handleLoginSubmit = (data) => {
    signInUserFunc(data.email, data.password)
      .then((res) => {
        console.log(res.user);
        navigate(location?.state || "/");

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome, ${res.user.email}!`,
          confirmButtonColor: "#4ade80",
        }).then(() => {
          navigate("/");
        });
      })
      .catch((error) => {
        console.error(error);

        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
          confirmButtonColor: "#f87171",
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="card bg-white w-full max-w-sm shadow-2xl rounded-lg p-6">
        <h1 className="text-3xl text-secondary font-bold mb-2">
          Welcome Back!
        </h1>
        <p className="text-gray-600 mb-4">Login with ZapShipt</p>

        <form onSubmit={handleSubmit(handleLoginSubmit)}>
          <div className="mb-4">
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input input-bordered w-full border-primary"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-primary mt-1">Email is required</p>
            )}
          </div>

          <div className="mb-4">
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/,
              })}
              className="input input-bordered w-full border-primary"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-primary mt-1">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-primary mt-1">
                Password must be 6 characters or longer
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-primary mt-1">
                Password must have One UpperCase, One LowerCase, One Digit and
                One Special Character.
              </p>
            )}
          </div>
          <p>
            Don’t have an account?
            <Link
              state={location.state}
              className="text-secondary font-bold"
              to="/register"
            >
              Register
            </Link>
          </p>

          <div className="mb-4 ">
            <a className="link link-hover text-sm">Forgot password?</a>
          </div>

          <button type="submit" className="btn bg-primary w-full">
            Login
          </button>
        </form>

        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
