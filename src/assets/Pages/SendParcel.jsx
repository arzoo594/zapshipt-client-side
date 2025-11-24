import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { AuthContext } from "../Contexts/AuthContext";

const sendParcel = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const servicesZone = useLoaderData();
  const regionsDuplicate = servicesZone.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];

  const senderRegion = watch("sender-region");
  const receiverRegion = watch("reciver-region");
  const parcelType = watch("parcelType");

  const districtsByRegion = (region) => {
    const regionDistricts = servicesZone.filter((c) => c.region == region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handleSendParcel = (data) => {
    const isSameDistrict = data.reciverDistrict == data.senderDistrict;
    let cost = 0;

    const isDocument = data.parcelType === "document";

    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      const parcelWeight = parseFloat(data.weight) || 0;

      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 130;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;

        cost = minCharge + extraCharge;
      }
    }

    data.cost = cost;

    Swal.fire({
      title: "Confirm Parcel Cost",
      text: `Total Cost: ${cost} TK`,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/parcels", data).then((res) => {
          navigate("/dasboard/my-parcels");
        });

        Swal.fire({
          title: "Confirmed!",
          text: "Parcel Has Been Created.Please Pay!.",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Cancelled!",
          text: "Parcel cost cancelled.",
          icon: "error",
        });
      }
    });
  };

  return (
    <div className="mt-10 mx-auto border border-gray-300 p-6 rounded-lg shadow-md bg-white">
      <h2 className="text-3xl font-bold text-secondary mb-2">Add Parcel</h2>
      <p className="text-sm text-secondary font-bold mb-4">
        Enter your parcel details
      </p>

      <form onSubmit={handleSubmit(handleSendParcel)}>
        {/* Parcel Type */}
        <div className="flex items-center gap-4 mb-4">
          <label className="flex items-center gap-2">
            <input value="document" type="radio" {...register("parcelType")} />
            Document
          </label>
          <label className="flex items-center gap-2">
            <input
              value="non-document"
              type="radio"
              {...register("parcelType")}
            />
            Non-Document
          </label>
        </div>

        {/* Parcel Info */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            {...register("name", { required: true })}
            placeholder="Parcel Name"
            className="input input-bordered w-full"
          />

          <input
            type="number"
            {...register("weight", {
              required: parcelType === "non-document",
            })}
            placeholder="Parcel Weight (KG)"
            className="input input-bordered w-full"
            disabled={parcelType === "document"}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Sender Details */}
          <div>
            <h3 className="font-semibold text-secondary mb-2">
              Sender Details
            </h3>

            <input
              type="email"
              defaultValue={user?.email}
              {...register("senderEmail")}
              placeholder="Sender Email"
              className="input input-bordered w-full mb-2"
            />

            <input
              type="text"
              defaultValue={user?.displayName}
              {...register("sender-name")}
              placeholder="Sender Name"
              className="input input-bordered w-full mb-2"
            />

            <input
              type="text"
              {...register("address")}
              placeholder="Address"
              className="input input-bordered w-full mb-2"
            />

            <input
              type="text"
              {...register("sender-contact")}
              placeholder="Sender Contact"
              className="input input-bordered w-full mb-2"
            />

            <select
              {...register("sender-region")}
              className="select select-bordered w-full mb-2"
            >
              <option>Select your region</option>
              {regions.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>

            <select
              {...register("senderDistrict")}
              className="select select-bordered w-full mb-2"
            >
              <option value="">Select your District</option>
              {districtsByRegion(senderRegion)?.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Receiver Details */}
          <div>
            <h3 className="font-semibold text-secondary mb-2">
              Receiver Details
            </h3>

            <input
              type="email"
              {...register("receiver-email")}
              placeholder="Receiver Email"
              className="input input-bordered w-full mb-2"
            />

            <input
              type="text"
              {...register("receiver-name")}
              placeholder="Receiver Name"
              className="input input-bordered w-full mb-2"
            />

            <input
              type="text"
              {...register("receiver-address")}
              placeholder="Receiver Address"
              className="input input-bordered w-full mb-2"
            />

            <input
              type="text"
              {...register("receiver-contact-no")}
              placeholder="Receiver Contact No"
              className="input input-bordered w-full mb-2"
            />

            <select
              {...register("reciver-region")}
              className="select select-bordered w-full mb-2"
            >
              <option>Select your region</option>
              {regions.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>

            <select
              {...register("reciverDistrict")}
              className="select select-bordered w-full mb-2"
            >
              <option value="">Select your District</option>
              {districtsByRegion(receiverRegion)?.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-4">Pickup 2-3 days</p>

        <button className="btn bg-primary text-black w-full">
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default sendParcel;
