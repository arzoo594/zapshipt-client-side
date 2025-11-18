import React from "react";
import Banner1 from "../../assets/Images/banner1.png";
import Banner2 from "../../assets/Images/banner2.png";
import Banner3 from "../../assets/Images/banner3.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HeroBanner = () => {
  return (
    <div className="relative  ">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        className="mt-8"
      >
        <div>
          <img src={Banner1} alt="Banner 1" />
        </div>
        <div>
          <img src={Banner2} alt="Banner 2" />
        </div>
        <div>
          <img src={Banner3} alt="Banner 3" />
        </div>
      </Carousel>
      <div className=" mx-auto text-center  border-l-4 border-l-primary mt-8  shadow-lg    rounded-lg bg-white   p-6 flex flex-col justify-between">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Fast & Reliable Delivery
        </h2>
        <p className="text-gray-600 mb-6">
          Track your parcels in real-time and enjoy hassle-free delivery with
          our trusted riders. <br /> Join us today and experience convenience
          like never before.
        </p>
        <div className="flex flex-row justify-center gap-4">
          <button className="bg-primary font-semibold px-4 py-2 text-sm sm:px-6 sm:py-2 sm:text-base rounded text-black shadow-lg hover:bg-lime-500 transition">
            Track Your Parcel
          </button>
          <button className="border border-gray-400 text-gray-800 font-semibold px-4 py-2 text-sm sm:px-6 sm:py-2 sm:text-base rounded shadow-lg hover:bg-gray-100 transition">
            Be A Rider
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
