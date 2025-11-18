import React from "react";
import service from "../../assets/Images/service.png";

const DetailsSection = () => {
  return (
    <div className="mt-8 rounded-md   bg-secondary p-12 ">
      <h2 className="text-3xl text-white font-bold text-center mb-2">
        Our Services
      </h2>
      <p className="text-center text-white text-gray-600 mb-6">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. <br /> From personal packages to business shipments — we deliver
        on time, every time.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white shadow-lg  border-l-4 border-l-primary rounded-lg shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition">
          <img
            src={service}
            alt="Express & Standard Delivery"
            className="w-12 h-12 mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">
            Express & Standard Delivery
          </h3>
          <p className="text-gray-600">
            We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet,
            Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6
            hours from pick-up to drop-off.
          </p>
        </div>

        <div className="bg-white shadow-lg  border-l-4 border-l-primary rounded-lg shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition">
          <img
            src={service}
            alt="Nationwide Delivery"
            className="w-12 h-12 mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">Nationwide Delivery</h3>
          <p className="text-gray-600">
            We deliver parcels nationwide with home delivery in every district,
            ensuring your products reach customers within 48–72 hours.
          </p>
        </div>

        <div className="bg-white shadow-lg  border-l-4 border-l-primary rounded-lg shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition">
          <img
            src={service}
            alt="Fulfillment Solution"
            className="w-12 h-12 mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">Fulfillment Solution</h3>
          <p className="text-gray-600">
            We also offer customized service with inventory management support,
            online order processing, packaging, and after sales support.
          </p>
        </div>

        <div className="bg-white shadow-lg  border-l-4 border-l-primary rounded-lg shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition">
          <img
            src={service}
            alt="Cash on Home Delivery"
            className="w-12 h-12 mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">Cash on Home Delivery</h3>
          <p className="text-gray-600">
            100% cash on delivery anywhere in Bangladesh with guaranteed safety
            of your product.
          </p>
        </div>

        <div className="bg-white shadow-lg  border-l-4 border-l-primary rounded-lg shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition">
          <img
            src={service}
            alt="Corporate Service"
            className="w-12 h-12 mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">
            Corporate Service / Contract In Logistics
          </h3>
          <p className="text-gray-600">
            Customized corporate services which includes warehouse and inventory
            management support.
          </p>
        </div>

        <div className="bg-white shadow-lg shadow-lg  border-l-4 border-l-primary rounded-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition">
          <img src={service} alt="Parcel Return" className="w-12 h-12 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Parcel Return</h3>
          <p className="text-gray-600">
            Through our reverse logistics facility we allow end customers to
            return or exchange their products with online business merchants.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailsSection;
