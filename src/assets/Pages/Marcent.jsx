import React from "react";
import merchant from "../../assets/Images/be-a-merchant-bg.png";

const Marcent = () => {
  return (
    <div className="mt-10 relative bg-secondary p-10 rounded-3xl overflow-visible">
      <img
        src={merchant}
        alt="Merchant"
        className="absolute -top-12   left-1/2 -translate-x-1/2 w-200 h-53 object-contain"
      />

      <div className="pt-20">
        <h1 className="font-bold  text-white text-2xl  ">
          Merchant and Customer Satisfaction is Our First Priority
        </h1>

        <p className="text-gray-300 mt-4">
          We offer the lowest delivery charge with the highest value along with
          100% safety of your product. Pathao courier delivers your parcels in
          every corner of Bangladesh right on time.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row  sm:space-x-5 space-y-4 sm:space-y-0">
          <button className="bg-primary hover:text-white hover:bg-[#738d26] cursor-pointer font-semibold rounded-full py-2 px-5">
            Become a Merchant
          </button>

          <button className="border-primary cursor-pointer font-semibold rounded-full hover:text-white hover:bg-primary text-primary border px-5 py-2">
            Earn with ZapShift Courier
          </button>
        </div>
      </div>
    </div>
  );
};

export default Marcent;
