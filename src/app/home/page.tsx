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
import React from "react";

export default function Home() {
  return (
    <Page back={false}>
      <List>
        <Section header="Welcome to Neuro Space">
          <div style={{ padding: "20px" }}>
            <NeuropunkRive />
          </div>

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
