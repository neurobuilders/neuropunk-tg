"use client";

import { useTranslations } from "next-intl";
import { Page } from "@/components/Page";

import React from "react";
import {
  Avatar,
  Badge,
  Banner,
  Button,
  Card,
  Cell,
  Chip,
  IconButton,
  Image,
  List,
  Section,
} from "@telegram-apps/telegram-ui";
import { Link } from "@/components/Link/Link";
import { Icon28Stats } from "@telegram-apps/telegram-ui/dist/icons/28/stats";
import { IconCheckbox } from "@telegram-apps/telegram-ui/dist/components/Form/Checkbox/icons/checkbox";
import { Check } from "lucide-react";
import RiveComponent from "@rive-app/react-canvas";

export default function Tasks() {
  const t = useTranslations("i18n");

  return (
    <Page back={true}>
      <List>
        <Banner
          before={
            <React.Fragment key=".0">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar size={96}>
                  <div style={{ width: "70px", height: "70px" }}>
                    <RiveComponent
                      src="/rives/loading.riv"
                      stateMachines={"State Machine 1"}
                      artboard={"Artboard"}
                    />
                  </div>
                </Avatar>

                <div style={{ textAlign: "center", marginTop: "10px" }}>
                  Your balance
                  <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                    2421 NP
                  </div>
                  {/*<div>XComplete tasks in NeuroReactor to earn NeuroPulse</div>*/}
                  <Link href="#">Hot it works</Link>
                </div>
              </div>
            </React.Fragment>
          }
          callout="Welcome Neuropunkers!"
          description="The NeuroReactor is the core of NeuroSpace, where energy flows and tasks unlock special rewards. Complete missions to harness NeuroPulse and boost your rank"
          header="Introducing Neuro Reactor"
          type="section"
        >
          <React.Fragment key=".0">
            <Button size="s">Claim 12.7344 NP</Button>
          </React.Fragment>
        </Banner>

        <Section header="⚡ Reactor Tasks">
          <Cell
            before={<Avatar size={40}>⚖️</Avatar>}
            after={<Badge type="number">+250</Badge>}
            subtitle="Balance energy flows."
          >
            Stabilize the Reactor
          </Cell>
          <Cell
            before={<Avatar size={40}>🔐</Avatar>}
            after={<Badge type="number">+500</Badge>}
            subtitle="Unlock hidden energy by solving puzzles."
          >
            Activate the Core
          </Cell>
          <Cell
            before={<Avatar size={40}>🛡️</Avatar>}
            after={<Badge type="number">+300</Badge>}
            subtitle="Protect the reactor from external threats."
          >
            Shield the Reactor
          </Cell>
          <Cell
            before={<Avatar size={40}>⚫</Avatar>}
            after={<Badge type="number">+1000</Badge>}
            subtitle="Control dark energy to unlock new abilities."
          >
            Harness Dark Energy
          </Cell>
        </Section>

        <Section header="Tasks">
          <Link href="/tasks">
            <Cell
              before={
                <Avatar size={40}>
                  <Image src={"/logo.png"} size={24} />
                </Avatar>
              }
              after={<Badge type="number">+100</Badge>}
            >
              Neuropunk App
            </Cell>
          </Link>

          <Link href="">
            <Cell
              before={
                <Image
                  src={"/logo.png"}
                  style={{ backgroundColor: "#007AFF" }}
                />
              }
              after={<Badge type="number">+100</Badge>}
              subtitle="Get Official App"
            >
              Neuropunk App
            </Cell>
          </Link>

          <Link href="/launch-params">
            <Cell
              before={
                <Avatar size={40}>
                  <Image src={"/logo.png"} size={24} />
                </Avatar>
              }
              after={
                <IconButton mode="outline" size="s">
                  <Check />
                </IconButton>
              }
            >
              Neuropunk Premium
            </Cell>
          </Link>

          <Link href="/theme-params">
            <Cell
              before={
                <Avatar size={40}>
                  <Image src={"/icons/telegram.svg"} size={24} />
                </Avatar>
              }
              after={<Badge type="number">+100</Badge>}
            >
              Neuropunk Channel
            </Cell>
          </Link>
        </Section>

        <Section header="Social">
          <Link href="">
            <Cell
              before={
                <Avatar size={40}>
                  <Image src={"/logo.png"} size={24} />
                </Avatar>
              }
              subtitle="Check our app in appstore and google play"
              after={<Badge type="number">+100</Badge>}
            >
              Neuropunk Chat
            </Cell>
          </Link>

          <Link href="">
            <Cell
              before={
                <Avatar size={40}>
                  <Image src={"/logo.png"} size={24} />
                </Avatar>
              }
              subtitle="Learn and co-create with us"
              after={<Badge type="number">+100</Badge>}
            >
              Neuropunk Academy
            </Cell>
          </Link>

          <Link href="/launch-params">
            <Cell
              before={
                <Avatar size={40}>
                  <Image src={"/icons/youtube.svg"} size={24} />
                </Avatar>
              }
              after={<Badge type="number">+100</Badge>}
              subtitle="Subscribe"
            >
              Neuropunk Youtube
            </Cell>
          </Link>

          <Link href="/theme-params">
            <Cell
              before={
                <Avatar size={40}>
                  <Image src={"/icons/soundcloud.svg"} size={24} />
                </Avatar>
              }
              after={<Badge type="number">+100</Badge>}
              subtitle="Listen"
            >
              Neuropunk SoundCloud
            </Cell>
          </Link>

          <Link href="" hidden={true}>
            <Cell
              before={
                <Avatar size={40}>
                  <Image src={"/logo.png"} size={24} />
                </Avatar>
              }
              after={<Badge type="number">+100</Badge>}
              subtitle="coming soon"
            >
              Neuropunk Marketplace
            </Cell>
          </Link>
        </Section>
      </List>
    </Page>
  );
}
