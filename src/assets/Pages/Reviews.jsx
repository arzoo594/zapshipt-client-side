import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import reviewp from "../../assets/Images/customer-top.png";
const Reviews = ({ reviewsData }) => {
  console.log(reviewsData);
  return (
    <div className="mt-10">
      <div className="text-center">
        <img src={reviewp} alt="" className="w-30 mx-auto mb-1" />

        <h2 className="text-2xl font-bold text-center mb-2">
          What our customers are sayings
        </h2>
        <p className="text-secondary mb-4">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. <br />
          Achieve proper alignment, reduce pain, and strengthen your body with
          ease!
        </p>
      </div>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"3"}
        coverflowEffect={{
          rotate: 30,
          loop: true,
          stretch: "50%",
          depth: 200,
          modifier: 1,
          slideShadows: true,
          scale: 0.75,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {reviewsData?.map((item, index) => (
          <SwiperSlide
            key={index}
            className="bg-white p-6 rounded-xl shadow-md w-80 text-center"
          >
            <img
              src={item.user_photoURL}
              alt={item.userName}
              className="w-16 h-16 rounded-full mx-auto mb-3 object-cover"
            />

            <h3 className="font-semibold text-lg">{item.userName}</h3>

            <p className="text-gray-600 text-sm mt-2">{item.review}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
