"use server";

import {
  Section,
  List,
  Placeholder,
  Button,
  Avatar,
  Banner,
} from "@telegram-apps/telegram-ui";
import { Page } from "@/components/Page";
import { NeuropunkRive } from "@/components/NeuropunkRive";
import React, { lazy, Suspense } from "react";

import "./styles.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import ArtistsSlider from "@/components/ArtistsSlider/ArtistsSlider";
import EventsList from "@/components/EventsList/EventsList";
import ReleasesSlider from "@/components/ReleasesSlider/ReleasesSlider";
import { getReleases } from "@/helpers/api/release";
import { getEvents } from "@/helpers/api/events";
import { getArtists } from "@/helpers/api/artist";
import dynamic from "next/dynamic";

const NeuroWave = dynamic(() => import("@/components/NeuroWave/NeuroWave"), {
  ssr: false,
});

const LoadingRive = dynamic(() => import("@/components/LoadingRive"), {
  ssr: false,
});

const CreateNeuropass = () => {
  return (
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
  );
};

export default async function HomePage() {
  const [releases, events, artists] = await Promise.all([
    getReleases(),
    getEvents(),
    getArtists(),
  ]);

  return (
    <Page back={false}>
      <List className="!pb-2">
        <Section>
          <Banner
            before={
              <Avatar size={96}>
                <div style={{ width: "70px", height: "70px" }}>
                  <LoadingRive />
                </div>
              </Avatar>
            }
            callout="Welcome Neuropunkers!"
            description="NeuroSpace is a unique digital ecosystem that unites drum and bass and tech enthusiasts within a dynamic virtual world"
            header="Introducing Neuro Reactor"
            type="section"
          >
            <Button size="s" stretched>
              Claim
            </Button>
          </Banner>
        </Section>
        <Section>
          <>
            <div className="row">
              <div className="px-6 pt-7">
                <NeuropunkRive />
              </div>
              <div className="animate__animated animate__fadeIn mt-9 pb-2">
                {/* <h2 className="text-lg mt-4 mx-5 pb-2">Latest Releases</h2> */}
                <ReleasesSlider releases={releases} />
              </div>
            </div>
            <div className="row">
              <h2 className="text-lg mt-4 mx-5 pb-2">Events</h2>
              <EventsList events={events} />
            </div>
          </>
        </Section>
      </List>
      <div className="full-width">
        <ArtistsSlider artists={artists} />
      </div>
    </Page>
  );
}
