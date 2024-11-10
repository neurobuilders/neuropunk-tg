"use client";

import React, { useRef } from "react";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { triggerHapticFeedback } from "@/helpers/telegram";
import { Release } from "@/helpers/api/release";
import clsx from "clsx";
import { Card } from "@telegram-apps/telegram-ui";
import { isTMA, openLink } from "@telegram-apps/sdk-react";
import { CardChip } from "@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardChip/CardChip";
import { captureException } from "@/helpers/utils";
import { CardCell } from "@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell";
import { useRouter } from "next/navigation";
import { ReleaseItem } from "./ReleaseItem/ReleaseItem";

interface ReleasesSliderProps {
  releases: Release[];
}

export default function ReleasesSlider(props: ReleasesSliderProps) {
  const { releases } = props;

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
      autoplay={{
        delay: 9000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation /*Autoplay*/]}
      className={clsx(
        "releases releases--latest swiper--releases",
        "!px-5 !pb-10 mt-2 mb-5"
      )}
    >
      {releases.map((v, i) => {
        return (
          <SwiperSlide key={v.url}>
            <ReleaseItem release={v} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
