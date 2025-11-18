import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";

const sendParcel = () => {
  const servicesZone = useLoaderData();
  const regionsDuplicate = servicesZone.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  console.log(regions);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleSendParcel = (data) => {
    console.log(data);
  };
  return (
    <div className=" mt-10 mx-auto border border-gray-300 p-6 rounded-lg shadow-md bg-white">
      <h2 className="text-3xl font-bold text-secondary mb-2">Add Parcel</h2>
      <p className="text-sm text-secondary font-bold mb-4">
        Enter your parcel details
      </p>

      <form onSubmit={handleSubmit(handleSendParcel)}>
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

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            {...register("name")}
            placeholder="Parcel Name"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            {...register("weight")}
            placeholder="Parcel Weight (KG)"
            className="input input-bordered w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="font-semibold text-secondary mb-2">
              Sender Details
            </h3>
            <input
              type="email"
              {...register("sender-email")}
              placeholder="Sender Email"
              className="input input-bordered w-full mb-2"
            />
            <input
              type="text"
              {...register("sender-name")}
              placeholder="Sender Name"
              className="input input-bordered w-full mb-2"
            />
            {/* <select className="select select-bordered w-full mb-2">
              <option>Select Wire house</option>
            </select> */}
            <input
              type="text"
              {...register("address")}
              placeholder="Address"
              className="input input-bordered w-full mb-2"
            />
            <input
              type="text"
              {...register("sender-contact")}
              placeholder="Sender Contact No"
              className="input input-bordered w-full mb-2"
            />
            <select className="select select-bordered w-full mb-2">
              <option>Select your region</option>
              {regions.map((r) => (
                <option>{r}</option>
              ))}
            </select>
            <select className="select select-bordered w-full mb-2">
              <option>Select your District</option>
            </select>
            <textarea
              {...register("pickup-instruction")}
              placeholder="Pickup Instruction"
              className="textarea textarea-bordered w-full"
            ></textarea>
          </div>

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
            {/* <select className="select select-bordered w-full mb-2">
              <option>Select Wire house</option>
            </select> */}
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
            <select className="select select-bordered w-full mb-2">
              <option>Select your region</option>
              {regions.map((r) => (
                <option>{r}</option>
              ))}
            </select>
            <select className="select select-bordered w-full mb-2">
              <option>Select your Disrict</option>
            </select>
            <textarea
              {...register("receiver-instruction")}
              placeholder="Delivery Instruction"
              className="textarea textarea-bordered w-full"
            ></textarea>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Pickup Time 4pm-7pm Approx.
        </p>

        <button className="btn bg-primary text-black w-full">
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default sendParcel;
