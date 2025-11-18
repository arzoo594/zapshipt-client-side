import React, { useEffect, useState } from "react";
import HeroBanner from "../Pages/HeroBanner";
import HowItWork from "../Pages/HowItWork";
import DetailsSection from "../Pages/DetailsSection";
import ServicesCompany from "../Pages/ServicesCompany";
import Reviews from "../Pages/Reviews";
import ParcelTracking from "../Pages/ParcelTracking";
import Marcent from "../Pages/Marcent";

const Home = () => {
  const [reviewsData, setReviewsData] = useState([]);
  useEffect(() => {
    fetch("/reviews.json ")
      .then((res) => res.json())
      .then((data) => setReviewsData(data));
  }, []);
  return (
    <div>
      <HeroBanner></HeroBanner>
      <HowItWork></HowItWork>
      <DetailsSection></DetailsSection>
      <ServicesCompany></ServicesCompany>
      <ParcelTracking></ParcelTracking>
      <Marcent></Marcent>
      <Reviews reviewsData={reviewsData}></Reviews>
    </div>
  );
};

export default Home;
