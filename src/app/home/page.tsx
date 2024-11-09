"use client";

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
import RiveComponent from "@rive-app/react-canvas";
import React, { Suspense } from "react";
import "./styles.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ArtistsSlider from "@/components/ArtistsSlider/ArtistsSlider";
import EventsList from "@/components/EventsList/EventsList";
import ReleasesSlider from "@/components/ReleasesSlider/ReleasesSlider";

export default function HomePage() {
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
              <Suspense fallback={<p>Loading releases...</p>}>
                <ReleasesSlider />
              </Suspense>
            </div>
            <div className="row">
              <h2 className="text-lg mt-4 mx-5 pb-2">Events</h2>
              <Suspense fallback={<p>Loading events...</p>}>
                <EventsList />
              </Suspense>
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
          <Suspense fallback={<p>Loading artists...</p>}>
            <ArtistsSlider />
          </Suspense>
        </div>
      </List>
    </Page>
  );
}
