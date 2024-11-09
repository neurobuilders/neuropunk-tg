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

import { NeuroWave } from "@/components/NeuroWave/NeuroWave";
import { NeuropunkRive } from "@/components/NeuropunkRive";
import React from "react";
import "./styles.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ArtistsSlider from "@/components/ArtistsSlider/ArtistsSlider";
import EventsList from "@/components/EventsList/EventsList";
import ReleasesSlider from "@/components/ReleasesSlider/ReleasesSlider";
import { getReleases } from "@/helpers/api/releases";
import { getEvents } from "@/helpers/api/events";
import { getArtists } from "@/helpers/api/artists";
import { LoadingRive } from "@/components/LoadingRive";

export default async function HomePage() {
  const [releases, events, artists] = await Promise.all([
    getReleases(),
    getEvents(),
    getArtists(),
  ]);

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
              <ReleasesSlider releases={releases} />
            </div>
            <div className="row">
              <h2 className="text-lg mt-4 mx-5 pb-2">Events</h2>
              <EventsList events={events} />
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
                  <LoadingRive />
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
          <ArtistsSlider artists={artists} />
        </div>
      </List>
    </Page>
  );
}
