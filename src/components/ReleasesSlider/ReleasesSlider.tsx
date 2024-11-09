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

interface ReleasesSliderProps {
  releases: Release[];
}

export default function ReleasesSlider(props: ReleasesSliderProps) {
  const { releases } = props;
  const imageRefs = useRef<Record<number, HTMLImageElement | null>>({});
  const t = useTranslations("i18n");
  const router = useRouter();

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
              onClick={async () => {
                const url = `/release/${v.slug}`;
                // if (await isTMA()) {
                //   openLink(url);
                // } else {
                // }
                router.push(url);
                triggerHapticFeedback();
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
