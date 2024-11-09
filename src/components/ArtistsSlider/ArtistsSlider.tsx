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
        delay: 9000,
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
      navigation={true}
      modules={[Parallax, Pagination, Navigation, Autoplay]}
      className="swiper--parallax"
    >
      <div
        slot="container-start"
        className="parallax-bg"
        style={{
          backgroundImage:
            "url(https://cdn.neurocdn.ru/CACHE/images/covers/bgg_artt/9a9488401193c637b18fe8ed7517859f.jpg)",
        }}
        data-swiper-parallax="-23%"
      ></div>
      {artists.map((v) => (
        <SwiperSlide key={v.url}>
          <div className="flex pb-4 gap-6 items-center">
            <Image
              src={v.imageUrl}
              alt={v.name}
              width={v.imageWidth}
              height={v.imageHeight}
              className="max-w-[80px]"
            />
            <div className="title" data-swiper-parallax="-300">
              {v.name}
            </div>
          </div>
          {/* <div className="subtitle" data-swiper-parallax="-200">
          {v.country}
        </div> */}
          <div className="text" data-swiper-parallax="-100">
            <p>{v.description}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
