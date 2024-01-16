import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import slide_image_1 from "../../../assets/HomeImages/1.webp";
import slide_image_2 from "../../../assets/HomeImages/2.webp";
import slide_image_3 from "../../../assets/HomeImages/3.webp";
import slide_image_4 from "../../../assets/HomeImages/4.webp";
import slide_image_5 from "../../../assets/HomeImages/5.webp";
import left from "../../../assets/HomeImages/Arrow - left 2.webp";
import right from "../../../assets/HomeImages/Arrow - right 2.webp";
import styles from "./GameItemSlider.module.css";
import { useState } from "react";

function GameItemSlider() {
  return (
   
      <Swiper
      spaceBetween={180}
      initialSlide={1}
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      loop={true}
      slidesPerView={'auto'}
      loopPreventsSliding={false}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
      }}
      autoplay={true}
      loopedSlides={2}
      speed={400}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        clickable: true,
      }}
      modules={[EffectCoverflow, Pagination, Navigation]}
      // className="swiper_container"
    >
      <SwiperSlide>
        <div className={styles.imageWrapper}>
          <img src={slide_image_2} alt="slide_image" />
          <div className={styles.imageContent}>
            <h3>XỔ SỐ</h3>
            <p>Tương Tác Với Nhà Cái, Cảm Giác Như Sòng Bạc Có Số Đất!</p>
            <button>Chơi Ngay</button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={styles.imageWrapper}>
          <img src={slide_image_3} alt="slide_image" />
          <div className={styles.imageContent}>
            <h3 style={{ marginTop: "20px" }}>DÀ GÀ</h3>
            <p>Chơi Với Các Thành Viên Khác Trong Biển Xanh Thẳm </p>
            <button>Chơi Ngay</button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={styles.imageWrapper}>
          <img src={slide_image_4} alt="slide_image" />
          <div className={styles.imageContent}>
            <h3>SÒNG BÀI</h3>
            <p>Tương Tác Với Nhà Cái, Cảm Giác Như Sòng Bạc Có Số Đất! </p>
            <button>Chơi Ngay</button>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className={styles.imageWrapper}>
          <img src={slide_image_5} alt="slide_image" />
          <div className={styles.imageContent}>
            <h3>BẮN CÁ</h3>
            <p>Chơi Hàng Ngàn Trò Chơi Trong Nền Tảng Của Chúng Tôi</p>
            <button>Chơi Ngay</button>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className={styles.imageWrapper}>
        <img src={slide_image_1} alt="slide_image" />
          <div className={styles.imageContent}>
            <h3>THỂ THAO</h3>
            <p>Tham Gia Các Sự Kiện Trên Toàn Thế Giới Để Vui Chơi Hơn! </p>
            <button>Chơi Ngay</button>
          </div>
        </div>
      </SwiperSlide>

      <div className="slider-controler">
        <div className="swiper-button-prev slider-arrow">
          <img src={left} alt=""  />
        </div>
        <div className="swiper-button-next slider-arrow">
          <img src={right} alt="" />
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </Swiper>
   
    
  );
}

export default GameItemSlider;