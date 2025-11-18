import React from "react";
import delivery1 from "../../assets/Images/live-tracking.png";
import delivery2 from "../../assets/Images/safe-delivery.png";
import supportImg from "../../assets/Images/safe-delivery.png";

const ParcelTracking = () => {
  const cardData = [
    {
      img: delivery1,
      title: "Live Parcel Tracking",
      text: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    },
    {
      img: delivery2,
      title: "100% Safe Delivery",
      text: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    },
    {
      img: supportImg,
      title: "24/7 Call Center Support",
      text: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-10 py-10">
      {cardData.map((item, index) => (
        <div
          key={index}
          className="flex gap-6 items-center bg-white border rounded-xl shadow-sm p-6"
        >
          <img src={item.img} alt="" className="w-40 h-40 object-contain" />

          <div className="border-l-2 border-dashed border-gray-400 h-28"></div>

          <div className="flex-1 pl-4">
            <h1 className="text-xl font-semibold text-gray-800 mb-2">
              {item.title}
            </h1>
            <p className="text-secondary leading-relaxed">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ParcelTracking;
