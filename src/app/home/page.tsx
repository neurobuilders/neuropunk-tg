"use client";

import {
  Section,
  List,
  Placeholder,
  Button,
  Avatar,
  Banner,
  Card,
} from "@telegram-apps/telegram-ui";

import { Page } from "@/components/Page";
import Image from "next/image";

import { NeuroWave } from "@/components/NeuroWave/NeuroWave";
import { NeuropunkRive } from "@/components/NeuropunkRive";
import RiveComponent from "@rive-app/react-canvas";
import React from "react";
import { CardChip } from "@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardChip/CardChip";
import { CardCell } from "@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell";
import "./styles.scss";
import clsx from "clsx";
import { openLink } from "@telegram-apps/sdk-react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

const latestReleases = [
  {
    title: "Synthesis LP",
    coverUrl:
      "https://cdn.neurocdn.ru/CACHE/images/covers/NRPNK065-3000x3000/d0b7f07c34c9f431e4008b4ee3cf4aa4.jpg",
    artist: "TNTKLZ",
    catalogNr: "NRPNK065",
    url: "https://neuropunk.app/release/tntklz-synthesis-lp",
    width: 370,
    height: 370,
  },
  {
    title: "Get Busy, You Was There",
    coverUrl:
      "https://cdn.neurocdn.ru/CACHE/images/covers/NRPNK064/90a77281a60c2c67be40229dc714cf35.jpg",
    artist: "L 33",
    catalogNr: "NRPNK064",
    url: "https://neuropunk.app/release/l-33-get-busy-you-was-there",
    width: 370,
    height: 370,
  },
  {
    title: "Vega Part 2",
    coverUrl:
      "https://cdn.neurocdn.ru/CACHE/images/covers/%D0%B2%D0%B5%D0%B3%D0%B02/3012536f2b39a9d18a10efc305ec36d4.jpg",
    artist: "IJENTA",
    catalogNr: "PPRFNK083",
    url: "https://neuropunk.app/release/ijenta-vefa-part-2",
    width: 370,
    height: 370,
  },
  {
    title: "PROSTO CRAZY",
    coverUrl:
      "https://cdn.neurocdn.ru/CACHE/images/covers/11/f95823b9e98219a381f6ef4c06e8d188.jpg",
    artist: "NERV3, Humane Made, Higrade, Verzor",
    catalogNr: "PPRFNK084",
    url: "https://neuropunk.app/release/nerv3-humane-made-higrade-verzor-prosto-crazy",
    width: 370,
    height: 370,
  },
];

const upcomingEvents = [
  {
    date: "11/09/2024",
    url: "https://neuropunk.ru/events/00-11-neuropunk-festilval-sound/",
    title: "Neuropunk Festilval (Санкт Петербург)",
    location: "@ Sound",
  },
  {
    date: "11/23/2024",
    url: "https://neuropunk.ru/events/neuropunk-ural-%d0%b5%d0%ba%d0%b1-%d1%84%d0%b0%d0%b1%d1%80%d0%b8%d0%ba%d0%b0/",
    title: "Neuropunk Ural (Екб)",
    location: "@ Фабрика",
  },
  {
    date: "02/21/2025",
    url: "https://neuropunk.ru/events/21-02-neuropunk-atmosphere/",
    title: "Neuropunk Festival (Москва)",
    location: "@ Atmosphere",
  },
];

export default function Home() {
  return (
    <Page back={false}>
      <List>
        <Section header="Welcome to Neuro Space">
          <>
            <div className="row">
              <div className="px-6 pt-4">
                <NeuropunkRive />
              </div>
              <h2 className="text-lg mt-4 mx-5 pb-2">Latest Releases</h2>
              <Swiper
                slidesPerView={2}
                spaceBetween={15}
                loop={true}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className={clsx(
                  "releases releases--latest",
                  "!px-5 !pb-10 mt-2 mb-5"
                )}
              >
                {latestReleases.map((v) => (
                  <SwiperSlide key={v.url}>
                    <Card
                      onClick={() => {
                        openLink(v.url);
                      }}
                    >
                      <React.Fragment key=".0">
                        <CardChip readOnly className="card-chip">
                          {v.catalogNr}
                        </CardChip>
                        <Image
                          src={v.coverUrl}
                          alt={v.title}
                          width={v.width}
                          height={v.height}
                          priority={true}
                        />
                        <CardCell
                          readOnly
                          subtitle={v.artist}
                          className="card-cell"
                        >
                          {v.title}
                        </CardCell>
                      </React.Fragment>
                    </Card>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="row">
              <h2 className="text-lg mt-4 mx-5 pb-2">Upcoming Events</h2>
              <div
                className={clsx(
                  "events events--upcoming",
                  "!px-5 !pb-10 mt-2 mb-5"
                )}
              >
                <ul className="flex flex-col gap-2 items-center justify-center">
                  {upcomingEvents.map((v) => (
                    <li
                      key={v.url}
                      className="w-full border-2 border-gray-700 rounded-xl"
                    >
                      <div className="flex justify-between p-5 gap-2">
                        <div className="col-span-5 md:col-span-4">
                          <p className="text-sky-500 font-bold text-xs">
                            {v.date}
                          </p>
                          <p className="text-gray-400 font-bold">{v.title}</p>
                          <p className="text-gray-600 text-sm">{v.location}</p>
                          {/* <p className="text-gray-400"> Beginner speakers </p> */}
                        </div>
                        <div className="flex flex-col justify-center">
                          <Button
                            mode="bezeled"
                            size="s"
                            onClick={() => {
                              openLink(v.url);
                            }}
                          >
                            More Info
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
          <div>
            <Placeholder
              action={
                <Button Component="a" href="/start" size="l" stretched>
                  Create Neuro Pass
                </Button>
              }
              description="The NeuroPass is not just a key; it’s a gateway to everything hidden beneath the surface"
            >
              <NeuroWave />
            </Placeholder>
          </div>
        </Section>
        <Section>
          <Banner
            before={
              <Avatar size={96}>
                <div style={{ width: "70px", height: "70px" }}>
                  <RiveComponent
                    src="/rives/loading.riv"
                    stateMachines={"State Machine 1"}
                    artboard={"Artboard"}
                  />
                </div>
              </Avatar>
            }
            callout="Welcome Neuropunkers!"
            description="NeuroSpace is a unique digital ecosystem that unites drum and bass and tech enthusiasts within a dynamic virtual world"
            header="Introducing Neuro Reactor"
            type="section"
          >
            <React.Fragment key=".0">
              <Button size="s">Claim</Button>
            </React.Fragment>
          </Banner>
        </Section>
      </List>
    </Page>
  );
}
