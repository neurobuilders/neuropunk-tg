"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { triggerHapticFeedback } from "@/helpers/telegram";
import { Release } from "@/helpers/api/release";
import clsx from "clsx";
import { ReleaseItem } from "./ReleaseItem/ReleaseItem";

interface ReleasesSliderProps {
  releases: Release[];
}

export default function ReleasesSlider(props: ReleasesSliderProps) {
  const { releases } = props;
  const [isSelected, setSelected] = useState(false);

  return (
    <Swiper
      onNavigationNext={() => {
        triggerHapticFeedback("medium");
      }}
      onNavigationPrev={() => {
        triggerHapticFeedback("medium");
      }}
      // onTouchStart={() => {
      //   triggerHapticFeedback("light");
      // }}
      // onTouchEnd={() => {
      //   triggerHapticFeedback("light");
      // }}
      slidesPerView={2}
      spaceBetween={20}
      loop={true}
      pagination={{
        clickable: true,
      }}
      // slidesOffsetAfter={1}
      // centeredSlides={true}
      autoplay={
        isSelected
          ? false
          : {
              delay: 9000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }
      }
      navigation={true}
      modules={[Pagination, Navigation, Autoplay]}
      className={clsx(
        "releases releases--latest swiper--releases",
        "!px-5 !pb-10 mt-2 mb-5"
      )}
    >
      {releases.map((v, i) => {
        return (
          <SwiperSlide key={v.url}>
            <ReleaseItem
              release={v}
              isDisabled={isSelected}
              onClick={() => {
                setSelected(true);
              }}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
