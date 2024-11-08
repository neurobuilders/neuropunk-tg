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
import React, { useRef } from "react";
import * as Sentry from "@sentry/nextjs";
import { CardChip } from "@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardChip/CardChip";
import { CardCell } from "@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell";
import "./styles.scss";
import clsx from "clsx";
import { openLink } from "@telegram-apps/sdk-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Parallax, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { triggerHapticFeedback } from "@/helpers/telegram";

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
    title: "Neuropunks LP 2",
    coverUrl:
      "https://cdn.neurocdn.ru/CACHE/images/covers/NRPNK063/8534c32b99793781a52805126eee9375.jpg",
    videoUrl: "/neuropunks_lp2.webm",
    artist: "Various Artists",
    catalogNr: "NRPNK063",
    url: "https://neuropunk.app/release/various-artists-neuropunks-lp-2",
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

const artists = [
  {
    name: "Gydra",
    country: "RU",
    description: `Gydra is D&B duo formed by legend of Russian D&B scene, leader of Neuropunk
podcast & Tamrecords Eugene Besman aka DJ Bes & outstanding Moscowbased
producer Nikolay Shilov aka Menfort.
With countless Beatport Drum & Bass TOP 10’s, releases on labels like Eatbrain,
Blackout, Bad Taste, Renegade Hardware, Cause 4 Concern and others, Gydra is
one of the most exciting and fastest growing Drum&Bass acts coming from
Russia.
Project also was nominated as best newcomer on Drum&Bass Awards 2017.
Guys are gaining regular DJ support from the likes of Noisia, Audio, Ed Rush &
Optical, Prolix, BTK, Optiv, Bad Company, Black Sun Empire, Jade, Billain, DC
Breaks (to name few!) as well as making appearances on huge music platforms
& radio shows.
After a huge two years of productions in Drum & Bass, Gydra looks to continue
to build off that success throughout 2018.`,
    url: "https://neuropunk.ru/artist/gydra/",
    imageUrl: "https://neuropunk.ru/wp-content/uploads/2018/06/6.jpg",
    imageWidth: 1170,
    imageHeight: 780,
  },
  {
    name: "L 33",
    country: "BG",
    description: `L 33 is a Bulgarian drum and bass producer and DJ known for his distinctive style in neurofunk. His music is defined by heavy basslines, sharp, aggressive synths, and intricate, high-energy rhythms. L 33 has released music on renowned labels like Eatbrain, Bad Taste Recordings, and MethLab, establishing a global presence in the drum and bass community. His complex sound design and technical prowess have earned him recognition among some of the most respected artists in the genre. In addition to solo productions, L 33 collaborates with other prominent artists and often creates impactful remixes, which showcase his unique approach to sound.`,
    url: "https://neuropunk.ru/artist/l-33/",
    imageUrl:
      "https://neuropunk.ru/wp-content/uploads/2024/11/312053536_668417284850498_8574182613708254731_n.jpg",
    imageWidth: 960,
    imageHeight: 960,
  },
  {
    name: "2Whales",
    country: "RU",
    description: `2Whales is a highly promising drum & bass duo from Russia’s city of Vologda. Having been inspired by the material delivered by the native artists, Bogdan and Yaroslav joined forces to create their own neuro style. These masters of deep and heavy bass do know how to serve their fat meals properly. Over less than two years of activity, they managed to receive support from different monsters of drum & bass scene. They repeatedly popped up in top 100 DNB Beatport Releases and different drum and bass podcasts such as: Pirate Station, Neuropunk, Dnb France, BBC Radio 1xtra and etc.`,
    url: "https://neuropunk.ru/artist/2whales/",
    imageUrl: "https://neuropunk.ru/wp-content/uploads/2023/08/GW_sEc9IYvw.jpg",
    imageWidth: 1170,
    imageHeight: 521,
  },
  {
    name: "KROT",
    country: "RU",
    description: `KROT has began his career as a DJ and producer in 2005. Originally from Saint Petersburg, Russia. The main direction in sound is old-school Neurofunk, but there are also releases in Soulful/Liquid funk d&b. Has been signed by many international labels, some of them: Eatbrain, Close2Death, Mindtech, High Resistance Greypost Audio, Live History, Modulate, Blu Saphir, KOS.MOS.MUSIC, Influenza Media, TAMP3CORDS and TILT.`,
    url: "https://neuropunk.ru/artist/krot/",
    imageUrl:
      "https://neuropunk.ru/wp-content/uploads/2023/07/%D0%91%D0%B5%D0%B7-%D0%B8%D0%BC%D0%B5%D0%BD%D0%B8-1.jpg?w=1313&ssl=1",
    imageWidth: 1170,
    imageHeight: 1280,
  },
];

export default function Home() {
  const imageRefs = useRef<Record<number, HTMLImageElement | null>>({});
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
                {latestReleases.map((v, i) => {
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
                                  Sentry.captureException(err);
                                }
                              }}
                            >
                              <source src={v.videoUrl} type="video/webm" />
                            </video>
                          )}
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
                  );
                })}
              </Swiper>
            </div>
            <div className="row">
              <h2 className="text-lg mt-4 mx-5 pb-2">Upcoming Events</h2>
              <div
                className={clsx(
                  "events events--upcoming",
                  "px-5 pb-5 mt-2 mb-2"
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
                              triggerHapticFeedback();
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
              className="pt-4 px-7 pb-9"
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
        <div>
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
            // onTouchStart={() => {
            //   triggerHapticFeedback("light");
            // }}
            // onTouchEnd={() => {
            //   triggerHapticFeedback("light");
            // }}
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
              style={
                {
                  "background-image":
                    "url(https://cdn.neurocdn.ru/CACHE/images/covers/bgg_artt/9a9488401193c637b18fe8ed7517859f.jpg)",
                } as any
              }
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
        </div>
      </List>
    </Page>
  );
}
