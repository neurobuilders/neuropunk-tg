"use client";

import { useTranslations } from "next-intl";
import { Page } from "@/components/Page";

import React, { useEffect, useState } from "react";
import { Button, Cell, Chip, List, Section } from "@telegram-apps/telegram-ui";
import NextImage from "next/image";

import "./styles.scss";
import clsx from "clsx";
import { useAppContext } from "@/context/AppContext";
import { ClipboardCopy } from "lucide-react";
import { shareURL } from "@telegram-apps/sdk";

export default function SquadPage() {
  const t = useTranslations("i18n");
  const [logoClassName, setLogoClassName] = useState(
    "animate__animated animate__fadeIn"
  );
  const { setEnergyProductionEnabled, energyAmount } = useAppContext();

  useEffect(() => {
    // after page load starting to generate neuro energy
    setEnergyProductionEnabled(true);
  }, []);

  const shareButtonHandler: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.preventDefault();
    try {
      shareURL("", "You have been invited to Neuropunk");
    } catch (err) {
      //
    }
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
            <div className="flex justify-center items-center py-3 !pt-5">
              <NextImage
                src="/images/invite-frens.jpg"
                alt="Invite frens"
                className={clsx("max-w-[50vw] max-h-full", logoClassName)}
                priority={true}
                width={1280}
                height={847}
              />
            </div>
            <div className="flex flex-col items-center justify-center w-full pb-5 px-5 mt-1">
              <h3 className="text-2xl font-bold mb-2">Invite punks</h3>
              <h3 className="text-sm">Invite frens to get bonuses!</h3>
              <h3 className="text-sm mb-2">
                Your frens: <strong>3</strong>
              </h3>
              <div className="pt-2 w-full">
                <Chip mode="mono" className="w-full mb-2 h-[42px]">
                  <span className="flex justify-center items-center gap-2 text-hint">
                    <span>Copy referral link</span> <ClipboardCopy size={18} />
                  </span>
                </Chip>
                <Button stretched onClick={shareButtonHandler}>
                  Share
                </Button>
              </div>
            </div>
          </div>
        </Section>
        <Section>
          <Cell
            className="squad-point"
            subtitle={
              <>
                <strong className="text-white">8 NE</strong> for you and fren.
              </>
            }
          >
            <strong>Invite fren</strong>
          </Cell>
          <Cell
            className="squad-point"
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
            className="squad-point"
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
            className="squad-point"
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
