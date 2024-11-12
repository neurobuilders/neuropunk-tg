"use client";

import { useTranslations } from "next-intl";
import { Page } from "@/components/Page";

import React, { useEffect, useRef, useState } from "react";
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
import { triggerHapticFeedback } from "@/helpers/telegram";
import { useAppContext } from "@/context/AppContext";

const updateVariable = (val: number) => {
  const rootEl = document.querySelector(":root");
  if (rootEl) {
    (rootEl as any).style.setProperty("--marks-translate-y", `${val}px`);
  }
};

export default function SquadPage() {
  const t = useTranslations("i18n");
  const [logoClassName, setLogoClassName] = useState(
    "animate__animated animate__fadeIn"
  );
  const { setEnergyProductionEnabled, energyAmount } = useAppContext();
  const [isModalOpen, setModalOpen] = useState(false);
  const [reactorClasses, setReactorClasses] = useState({
    // ["stopped"]: !setEnergyProductionEnabled,
    ["animate__animated"]: true,
    ["pt-4 pb-3"]: true,
    ["animate__fadeIn"]: true,
  });

  useEffect(() => {
    // after page load starting to generate neuro energy
    setEnergyProductionEnabled(true);
  }, []);

  const claimButtonHandler: (
    value: number,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void = (value, e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLogoClassName("anim_pulsation");
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <Page back={true}>
      <List>
        <Section>
          <div>
            <div className="relative flex justify-center items-center py-3">
              <NextImage
                src="/logo.svg"
                fill={true}
                alt="Reactor logo"
                className={clsx(
                  "!relative max-w-[50vw] max-h-full",
                  logoClassName
                )}
                priority={true}
              />
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-bold">Invite punks</h3>
              <h3 className="text-md">Invite frens to get bonuses!</h3>
              <div className="">
                <Button stretched>Share</Button>
              </div>
            </div>
          </div>
        </Section>
        <Section className="squad-cons">
          <Cell
            subtitle={
              <>
                <strong className="text-white">8 NE</strong> for you and fren.
              </>
            }
          >
            <strong>Invite fren</strong>
          </Cell>
          <Cell
            subtitle={
              <>
                <strong className="text-white">64 NE</strong> for you and fren.
              </>
            }
          >
            Fren with{" "}
            <strong className="text-telegram">Telegram Premium</strong>
          </Cell>
          <Cell
            subtitle={
              <>
                <strong className="text-white">16%</strong> of all frens&apos;
                mining
              </>
            }
          >
            <strong>Mining drop</strong>
          </Cell>
          <Cell
            subtitle={
              <>
                <strong className="text-white">Mega Drop</strong> If your
                referrals invite <strong>1000+</strong> frens.
              </>
            }
          >
            <strong>Rank &quot;Leader&quot;</strong>
          </Cell>
        </Section>
      </List>
    </Page>
  );
}
