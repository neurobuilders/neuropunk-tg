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
import { Check } from "lucide-react";
import RiveComponent from "@rive-app/react-canvas";
import NextImage from "next/image";

import "./styles.scss";

export default function Tasks() {
  const t = useTranslations("i18n");

  return (
    <Page back={true}>
      <List>
        <Section header="Your Neuro Reactor is Ready">
          <div className="pb-8">
            <div className="relative h-[150px] mt-6">
              <NextImage
                src="/logo.svg"
                fill={true}
                alt="Reactor logo"
                priority={true}
              />
            </div>
          </div>
        </Section>
        <Banner
          className="banner"
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
            <Button size="s" className="mt-1 mb-2">
              Claim 12.7344 NP
            </Button>
          </React.Fragment>
        </Banner>

        <Section className="tasks" header="⚡ Reactor Tasks">
          <Cell
            before={<Avatar size={40}>⚖️</Avatar>}
            after={
              <Badge className="badge" type="number">
                +250
              </Badge>
            }
            subtitle="Balance energy flows."
          >
            Stabilize the Reactor
          </Cell>
          <Cell
            before={<Avatar size={40}>🔐</Avatar>}
            after={
              <Badge className="badge" type="number">
                +500
              </Badge>
            }
            subtitle="Unlock hidden energy by solving puzzles."
          >
            Activate the Core
          </Cell>
          <Cell
            before={<Avatar size={40}>🛡️</Avatar>}
            after={
              <Badge className="badge" type="number">
                +300
              </Badge>
            }
            subtitle="Protect the reactor from external threats."
          >
            Shield the Reactor
          </Cell>
          <Cell
            before={<Avatar size={40}>⚫</Avatar>}
            after={
              <Badge className="badge" type="number">
                +1000
              </Badge>
            }
            subtitle="Control dark energy to unlock new abilities."
          >
            Harness Dark Energy
          </Cell>
        </Section>

        <Section className="tasks" header="Tasks">
          <Link href="/tasks">
            <Cell
              before={
                <Avatar className="task__avatar" size={40}>
                  <Image src={"/logo.png"} size={24} alt="Neuropunk App" />
                </Avatar>
              }
              after={
                <Badge className="badge" type="number">
                  +100
                </Badge>
              }
            >
              Neuropunk App
            </Cell>
          </Link>

          <Link href="">
            <Cell
              before={
                <Avatar
                  className="task__avatar"
                  size={40}
                  style={{ backgroundColor: "#007AFF" }}
                >
                  <Image src={"/logo.png"} size={24} alt="Neuropunk App" />
                </Avatar>
              }
              after={
                <Badge className="badge" type="number">
                  +100
                </Badge>
              }
              subtitle="Get Official App"
            >
              Neuropunk App
            </Cell>
          </Link>

          <Link href="/launch-params">
            <Cell
              before={
                <Avatar className="task__avatar" size={40}>
                  <Image src={"/logo.png"} size={24} alt="Neuropunk Premium" />
                </Avatar>
              }
              after={
                <IconButton mode="outline" size="s" className="rounded-lg p-1">
                  <Check className="mx-1.5" />
                </IconButton>
              }
            >
              Neuropunk Premium
            </Cell>
          </Link>

          <Link href="/theme-params">
            <Cell
              before={
                <Avatar className="task__avatar" size={40}>
                  <Image
                    src={"/icons/telegram.svg"}
                    size={24}
                    alt="Neuropunk Channel"
                  />
                </Avatar>
              }
              after={
                <Badge className="badge" type="number">
                  +100
                </Badge>
              }
            >
              Neuropunk Channel
            </Cell>
          </Link>
        </Section>

        <Section className="tasks" header="Social">
          <Link href="#">
            <Cell
              before={
                <Avatar className="task__avatar" size={40}>
                  <Image src={"/logo.png"} size={24} alt="Neuropunk Chat" />
                </Avatar>
              }
              subtitle="Check our app in appstore and google play"
              after={
                <Badge className="badge" type="number">
                  +100
                </Badge>
              }
            >
              Neuropunk Chat
            </Cell>
          </Link>

          <Link href="#">
            <Cell
              before={
                <Avatar className="task__avatar" size={40}>
                  <Image src={"/logo.png"} size={24} alt="Neuropunk Academy" />
                </Avatar>
              }
              subtitle="Learn and co-create with us"
              after={
                <Badge className="badge" type="number">
                  +100
                </Badge>
              }
            >
              Neuropunk Academy
            </Cell>
          </Link>

          <Link href="/launch-params">
            <Cell
              before={
                <Avatar className="task__avatar" size={40}>
                  <Image
                    src={"/icons/youtube.svg"}
                    size={24}
                    alt="Neuropunk Youtube"
                  />
                </Avatar>
              }
              after={
                <Badge className="badge" type="number">
                  +100
                </Badge>
              }
              subtitle="Subscribe"
            >
              Neuropunk Youtube
            </Cell>
          </Link>

          <Link href="/theme-params">
            <Cell
              before={
                <Avatar className="task__avatar" size={40}>
                  <Image
                    src={"/icons/soundcloud.svg"}
                    size={24}
                    alt="Neuropunk SoundCloud"
                  />
                </Avatar>
              }
              after={
                <Badge className="badge" type="number">
                  +100
                </Badge>
              }
              subtitle="Listen"
            >
              Neuropunk SoundCloud
            </Cell>
          </Link>

          <Link href="#" hidden={true}>
            <Cell
              before={
                <Avatar className="task__avatar" size={40}>
                  <Image
                    src={"/logo.png"}
                    size={24}
                    alt="Neuropunk Marketplace"
                  />
                </Avatar>
              }
              after={
                <Badge className="badge" type="number">
                  +100
                </Badge>
              }
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
