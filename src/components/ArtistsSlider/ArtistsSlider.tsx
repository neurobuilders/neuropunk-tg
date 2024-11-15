"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Parallax, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.scss";
import Image from "next/image";
import { triggerHapticFeedback } from "@/helpers/telegram";
import { Artist } from "@/helpers/api/artist";
import { Card } from "@telegram-apps/telegram-ui";
import { CardCell } from "@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell";

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
          // "--swiper-pagination-bottom": "-30px",
        } as any
      }
      speed={600}
      centeredSlides={true}
      pagination={{
        clickable: true,
      }}
      slidesPerView={3}
      spaceBetween={10}
      loop={true}
      modules={[Pagination /*Autoplay*/]}
      className="mt-3 !pb-[40px] !px-2"
    >
      {artists.map((v) => (
        <SwiperSlide key={v.url}>
          <Card type="ambient" className="artist-card">
            <Image
              src={v.imageUrl}
              alt={v.name}
              width={v.imageWidth}
              height={v.imageHeight}
              className="min-w-[110px] h-[150px] object-cover"
            />
            <CardCell readOnly className="card-cell">
              {v.name}
            </CardCell>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
