import React from "react";

import amazon_vector from "../../assets/Images/amazon_vector.png";
import star from "../../assets/Images/star.png";

import casio from "../../assets/Images/casio.png";
import moonstar from "../../assets/Images/moonstar.png";
import randstad from "../../assets/Images/randstad.png";
import Marquee from "react-fast-marquee";

const ServicesCompany = () => {
  return (
    <div className="mt-12 ">
      <h3 className="text-secondary mb-8 font-extrabold text-xl text-center">
        We've helped thousands of sales teams
      </h3>
      <div className="lg:w-8/12 mx-auto">
        <Marquee className="">
          <img className="mr-4" src={amazon_vector} alt="" />
          <img className="mr-6" src={moonstar} alt="" />
          <img className="mr-6" src={randstad} alt="" />
          <img className="mr-6" src={casio} alt="" />
          <img className="mr-6" src={star} alt="" />
        </Marquee>
      </div>
      <p className="text-center text-primary my-4">
        ----------------------------------------------------------------------------------
      </p>
    </div>
  );
};

export default ServicesCompany;
