"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Parallax, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { triggerHapticFeedback } from "@/helpers/telegram";
import { Artist } from "@/helpers/api/artist";

interface ArtistsSliderProps {
  artists: Artist[];
}

export default function ArtistsSlider(props: ArtistsSliderProps) {
  const { artists } = props;
  const t = useTranslations("i18n");

  return (
    <Swiper
      onNavigationNext={() => {
        triggerHapticFeedback("medium");
      }}
      onNavigationPrev={() => {
        triggerHapticFeedback("medium");
      }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      style={
        {
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        } as any
      }
      speed={600}
      parallax={true}
      pagination={{
        clickable: true,
      }}
      loop={true}
      navigation={false}
      modules={[Parallax, Pagination, Navigation, Autoplay]}
      className="swiper--parallax"
    >
      {artists.map((v) => (
        <SwiperSlide key={v.url}>
          <div className="flex gap-8 items-center">
            <Image
              src={v.imageUrl}
              alt={v.name}
              width={v.imageWidth}
              height={v.imageHeight}
              className="w-[125px] min-w-[125px] h-[125px] object-cover"
            />
            <div className="title !mb-0" data-swiper-parallax="-300">
              {v.name}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
