import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Contexts/AuthContext";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "../FireBase/firebase.config";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { registerUser, updateProfileFunc } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure();

  const handleRegisterSubmit = (data) => {
    console.log("after register", data.photo[0]);
    const profileImg = data.photo[0];
    registerUser(data.email, data.password)
      .then((res) => {
        //profile and photo upload process start
        const formData = new FormData();
        formData.append("image", profileImg);
        const image_Api_Url = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_HOST_KEY
        }`;
        axios.post(image_Api_Url, formData).then((res) => {
          console.log(res.data.data.url);
          const photoURL = res.data.data.url;
          // update profile
          const updateProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };
          // for user collection create
          const userInfo = {
            displayName: data.name,
            photoURL: res.data.data.url,
            email: data.email,
          };
          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user created in the database");
            }
          });

          updateProfileFunc(updateProfile)
            .then(() => {
              signOut(auth);
              navigate(location.state || "/");
            })
            .catch((error) => console.log(error));
        });
        //profile and photo upload process complete

        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: `Welcome, ${res.user.email}!`,
          confirmButtonColor: "#4ade80",
        }).then(() => {
          reset();
          navigate("/login");
        });
      })
      .catch((error) => {
        console.error(error);

        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: error.message,
          confirmButtonColor: "#f87171",
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="card bg-white w-full max-w-sm shadow-2xl rounded-lg p-6">
        <h1 className="text-3xl text-secondary font-bold mb-2">
          Create an Account!
        </h1>
        <p className="text-gray-600 mb-4">Register with ZapShipt</p>

        <form onSubmit={handleSubmit(handleRegisterSubmit)}>
          <div className="mb-4">
            <label className="label">Photo</label>
            <input
              type="file"
              {...register("photo", { required: true })}
              className="file-input border-primary"
              placeholder="Photo"
            />
            {errors.email?.type === "required" && (
              <p className="text-primary mt-1">Photo is required</p>
            )}
          </div>
          <div className="mb-4">
            <label className="label">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input input-bordered w-full border-primary"
              placeholder="Name"
            />
            {errors.email?.type === "required" && (
              <p className="text-primary mt-1">Name is required</p>
            )}
          </div>
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

          <p className="mb-2">
            Already have an account?{" "}
            <Link
              state={location.state}
              className="text-secondary font-bold"
              to="/login"
            >
              Login
            </Link>
          </p>

          <div className="mb-4">
            <a className="link link-hover text-sm">Forgot password?</a>
          </div>

          <button type="submit" className="btn bg-primary w-full">
            Register
          </button>
        </form>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Register;
