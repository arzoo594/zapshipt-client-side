import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";

const HowItWork = () => {
  return (
    <div className="mt-8  sm:px-6 ">
      <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>

      <div className="grid grid-cols-1    sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white   shadow-lg p-6   border-l-4 border-l-primary rounded-lg  flex flex-col items-center text-center hover:shadow-xl transition">
          <div className="text-5xl text-primary mb-4">
            <CiDeliveryTruck />
          </div>
          <h3 className="text-xl font-semibold mb-2">Booking Pick & Drop</h3>
          <p className="text-gray-600">
            From personal packages to business shipments — we deliver on time,
            every time.
          </p>
        </div>

        <div className="bg-white   shadow-lg p-6   border-l-4 border-l-primary rounded-lg  flex flex-col items-center text-center hover:shadow-xl transition">
          <div className="text-5xl text-primary mb-4">
            <CiDeliveryTruck />
          </div>
          <h3 className="text-xl font-semibold mb-2">Cash On Delivery</h3>
          <p className="text-gray-600">
            Secure and reliable cash on delivery service for all your shipments.
          </p>
        </div>

        <div className="bg-white   shadow-lg p-6   border-l-4 border-l-primary rounded-lg  flex flex-col items-center text-center hover:shadow-xl transition">
          <div className="text-5xl text-primary mb-4">
            <CiDeliveryTruck />
          </div>
          <h3 className="text-xl font-semibold mb-2">Delivery Hub</h3>
          <p className="text-gray-600">
            Centralized hubs ensure fast and organized parcel delivery across
            regions.
          </p>
        </div>

        <div className="bg-white    p-6 shadow-lg  border-l-4 border-l-primary rounded-lg  flex flex-col items-center text-center hover:shadow-xl transition">
          <div className="text-5xl text-primary mb-4">
            <CiDeliveryTruck />
          </div>
          <h3 className="text-xl font-semibold mb-2">
            Booking SME & Corporate
          </h3>
          <p className="text-gray-600">
            Special services for small businesses and corporate clients with
            timely delivery.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWork;
