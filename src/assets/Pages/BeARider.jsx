import React, { useContext } from "react";
import { useForm, useWatch } from "react-hook-form";

import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { AuthContext } from "../Contexts/AuthContext";

const BeARider = () => {
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors }
  } = useForm();
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();

  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);

  const regions = [...new Set(regionsDuplicate)];
  // explore useMemo useCallback
  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const riderRegion = useWatch({ control, name: "region" });

  const handleRiderApplication = (data) => {
    console.log(data);

    axiosSecure
      .post("/riders", data)
      .then((res) => {
        if (res.data.message === "rider already exist") {
          Swal.fire({
            position: "top-center",
            icon: "warning",
            title: `Hello ${data.name}, you already have an account!`,
            showConfirmButton: true,
          });
          return;
        }
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `Hello ${data.name}! Your application has been submitted. We will reach to you in 145 days.`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "Oops!",
          text: error.message || "Something went wrong. Please try again.",
          showConfirmButton: true,
        });
      });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-4xl font-bold text-primary text-center mb-3">
        Be a Rider
      </h2>
      <p className="mb-8 text-center ">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. <br /> From personal packages to business shipments — we deliver
        on time, every time.
      </p>

      <form
        onSubmit={handleSubmit(handleRiderApplication)}
        className="space-y-8 text-black"
      >
        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Rider Details */}
          <fieldset className="border border-gray-200 p-6 rounded-lg shadow-sm">
            <h4 className="text-2xl font-semibold mb-4">Rider Details</h4>

            <label className="block text-sm font-medium mb-1">Rider Name</label>
            <input
              type="text"
              {...register("name")}
              defaultValue={user?.displayName}
              className="input w-full border border-gray-300 p-2 rounded mb-4 focus:ring-2 focus:ring-lime-400"
              placeholder="Sender Name"
            />

            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="text"
              {...register("email")}
              defaultValue={user?.email}
              className="input w-full border border-gray-300 p-2 rounded mb-4 focus:ring-2 focus:ring-lime-400"
              placeholder="Sender Email"
            />

            {/* Regions */}
            <fieldset className="mb-4">
              <legend className="font-medium mb-2">Regions</legend>
              <select
                {...register("region")}
                defaultValue="Pick a region"
                className="select w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-lime-400"
              >
                <option disabled>Pick a region</option>
                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* Districts */}
            <fieldset className="mb-4">
              <legend className="font-medium mb-2">Districts</legend>
              <select
                {...register("district")}
                defaultValue="Pick a district"
                className="select w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-lime-400"
              >
                <option disabled>Pick a district</option>
                {districtsByRegion(riderRegion).map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            <label className="block text-sm font-medium mb-1 mt-4">
              Your Address
            </label>
            <input
              type="text"
              {...register("address")}
              className="input w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-lime-400"
              placeholder="Sender Address"
            />
          </fieldset>

          {/* More Details */}
          <fieldset className="border border-gray-200 p-6 rounded-lg shadow-sm">
            <h4 className="text-2xl font-semibold mb-4">More Details</h4>

            <label className="block text-sm font-medium mb-1">
              Driving License
            </label>
            <input
              type="text"
              {...register("license")}
              className="input w-full border border-gray-300 p-2 rounded mb-4 focus:ring-2 focus:ring-lime-400"
              placeholder="Driving License"
            />

            <label className="block text-sm font-medium mb-1">NID</label>
            <input
              type="text"
              {...register("nid")}
              className="input w-full border border-gray-300 p-2 rounded mb-4 focus:ring-2 focus:ring-lime-400"
              placeholder="NID"
            />

            <label className="block text-sm font-medium mb-1 mt-4">BIKE</label>
            <input
              type="text"
              {...register("bike")}
              className="input w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-lime-400"
              placeholder="Bike"
            />
          </fieldset>
        </div>

        <input
          type="submit"
          className="btn btn-primary w-full py-3 mt-4 text-black font-semibold bg-lime-400 rounded-lg hover:bg-lime-500 transition-colors"
          value="Apply as a Rider"
        />
      </form>
    </div>
  );
};

export default BeARider;
