import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const Payment = () => {
  const { id } = useParams();
  const axiosSecure = UseAxiosSecure();
  const { isLoading, data: parcel } = useQuery({
    queryKey: ["parcels", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${id}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    const paymentInfo = {
      cost: parcel.cost,
      id: parcel._id,
      senderEmail: parcel.senderEmail,
      name: parcel.name,
    };
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);

    window.location.href = res.data.url;
  };
  if (isLoading) {
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-row items-center gap-4">
        <span className="loading loading-spinner w-4 h-4"></span>
        <span className="loading loading-spinner w-6 h-6"></span>
        <span className="loading loading-spinner w-8 h-8"></span>
        <span className="loading loading-spinner w-10 h-10"></span>
        <span className="loading loading-spinner w-12 h-12"></span>
      </div>
    </div>;
  }
  return (
    <div className="bg-secondary p-6 rounded-2xl shadow-lg text-white w-fit space-y-2">
      <p className="text-xl font-semibold">
        Payment Components:{" "}
        <span className="text-primary font-bold">{parcel?.name}</span>
      </p>

      <p className="text-lg font-medium">
        Payment Price:{" "}
        <span className="text-primary font-bold">$ {parcel?.cost}</span>
      </p>
      <button
        onClick={handlePayment}
        className="bg-primary text-secondary font-bold px-6 py-2 rounded-xl shadow-md hover:bg-secondary hover:text-primary border-2 border-primary transition duration-300 flex items-center gap-2"
      >
        Pay
      </button>
    </div>
  );
};

export default Payment;
