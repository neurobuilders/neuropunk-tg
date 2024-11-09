"use client";

import { useTranslations } from "next-intl";
import { Page } from "@/components/Page";

import React, { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  Cell,
  IconButton,
  Image,
  List,
  Modal,
  Section,
} from "@telegram-apps/telegram-ui";
import { Link } from "@/components/Link/Link";
import { Check } from "lucide-react";
import NextImage from "next/image";

import "./styles.scss";
import { ReactorLogoBackground } from "@/components/ParticlesBackground/ReactorLogoBackground";
import clsx from "clsx";
import ClaimButton from "@/components/Button/ClaimButton";
import { formatNumber } from "@/helpers/utils";
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";

const claimButtonStartValue = 0;
const initialNeuroEnergyAmount = 2746;
const neuroEnergyPerSecond = 0.0013;

export default function ReactorPage() {
  const t = useTranslations("i18n");
  const [logoClassName, setLogoClassName] = useState(
    "animate__animated animate__fadeIn"
  );

  const [isModalOpen, setModalOpen] = useState(false);
  const [currentNeuroEnergyAmount, setCurrentNeuroEnergyAmount] = useState(
    initialNeuroEnergyAmount
  );

  const claimButtonHandler: (
    value: number,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void = (value: number, e) => {
    e.preventDefault();
    setCurrentNeuroEnergyAmount((prevVal) => {
      return prevVal + value;
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setLogoClassName("anim_pulsation");
    }, 500);
  }, []);

  return (
    <Page back={true}>
      <List>
        <Section header="">
          <div>
            <div className="relative">
              <ReactorLogoBackground className="animate__animated animate__fadeIn pt-[40px]">
                <NextImage
                  src="/logo.svg"
                  fill={true}
                  alt="Reactor logo"
                  className={clsx(
                    "!relative max-w-full max-h-full",
                    logoClassName
                  )}
                  priority={true}
                />
              </ReactorLogoBackground>
            </div>
            <div className="flex flex-col items-center mt-[50px]">
              <h3 className="text-2xl font-bold mb-1">
                {formatNumber(currentNeuroEnergyAmount, 2)} NE
              </h3>
              <h3 className="text-md mt-2">
                Complete tasks and mine <strong>Neuro Energy</strong>
              </h3>
              <Modal
                header={<ModalHeader></ModalHeader>}
                open={isModalOpen}
                onOpenChange={setModalOpen}
                trigger={
                  <button type="button" className="text-sky-500 mt-1">
                    How it works →
                  </button>
                }
              >
                <div className="px-5 pb-6 mb-2">
                  <h3 className="text-2xl font-bold mb-3">
                    Introducing Neuro Reactor
                  </h3>
                  <p className="mb-5">
                    The NeuroReactor is the core of NeuroSpace, where energy
                    flows and tasks unlock special rewards. Complete missions to
                    harness NeuroPulse and boost your rank
                  </p>
                  <h3 className="text-2xl font-bold mb-3">
                    Welcome Neuropunkers!
                  </h3>
                  <p className="pb-6">
                    The NeuroReactor is the core of NeuroSpace, where energy
                    flows and tasks unlock special rewards. Complete missions to
                    harness NeuroPulse and boost your rank
                  </p>
                  <Button
                    size="l"
                    stretched
                    onClick={() => {
                      setModalOpen(false);
                    }}
                  >
                    Okay, got it
                  </Button>
                </div>
              </Modal>
              <div className="">
                <ClaimButton
                  className="mt-[40px] mb-[30px]"
                  onClick={claimButtonHandler}
                  valuePerSecond={neuroEnergyPerSecond}
                  startValue={claimButtonStartValue}
                />
              </div>
            </div>
          </div>
        </Section>
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
