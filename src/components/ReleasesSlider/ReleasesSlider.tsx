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
import { getReleases } from "@/helpers/api/releases";
import clsx from "clsx";
import { Card } from "@telegram-apps/telegram-ui";
import { openLink } from "@telegram-apps/sdk-react";
import { CardChip } from "@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardChip/CardChip";
import { captureException } from "@/helpers/utils";
import { CardCell } from "@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell";

export default async function ReleasesSlider() {
  const imageRefs = useRef<Record<number, HTMLImageElement | null>>({});
  const t = useTranslations("i18n");

  const releases = await getReleases();

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
      spaceBetween={15}
      loop={true}
      pagination={{
        clickable: true,
      }}
      // centeredSlides={true}
      autoplay={{
        delay: 9000,
        disableOnInteraction: false,
      }}
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
            <Card
              onClick={() => {
                triggerHapticFeedback();
                openLink(v.url);
              }}
            >
              <React.Fragment key=".0">
                <CardChip readOnly className="card-chip">
                  {v.catalogNr}
                </CardChip>
                <Image
                  ref={(ref) => {
                    imageRefs.current[i] = ref;
                  }}
                  src={v.coverUrl}
                  alt={v.title}
                  width={v.width}
                  height={v.height}
                  priority={true}
                />
                {v.videoUrl && (
                  <video
                    playsInline
                    muted
                    autoPlay
                    loop
                    className="hidden"
                    width="100%"
                    preload=""
                    onPlay={(e) => {
                      (e.target as any)?.classList.remove("hidden");
                      imageRefs.current[i]?.classList.add("hidden");
                    }}
                    onCanPlayThrough={async (e) => {
                      try {
                        await (e.target as any)?.play();
                      } catch (err) {
                        captureException(err);
                      }
                    }}
                  >
                    <source src={v.videoUrl} type="video/webm" />
                  </video>
                )}
                <CardCell readOnly subtitle={v.artist} className="card-cell">
                  {v.title}
                </CardCell>
              </React.Fragment>
            </Card>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
