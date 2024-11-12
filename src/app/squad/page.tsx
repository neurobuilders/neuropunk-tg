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
import { getBotUrl, triggerHapticFeedback } from "@/helpers/telegram";
import { useSession } from "next-auth/react";
import { useToast } from "@/context/ToastContext";
import { ExtendedUser } from "@/types/next-auth";
import { captureException } from "@/helpers/utils";

export default function SquadPage() {
  const { data: session } = useSession();
  const t = useTranslations("i18n");
  const { showToast } = useToast();
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
      triggerHapticFeedback();
      console.log("session", session);
      const tgId = (session?.user as ExtendedUser).tgId;
      let shareUrl = getBotUrl(`invite_${tgId}`);
      if (!tgId) {
        throw new Error("Telegram ID is empty");
      }
      shareURL(shareUrl, "You have been invited to Neuropunk Universe!");
    } catch (err) {
      captureException(err);
      showToast({
        title: "Error occured",
        message: (err as Error).message,
        type: "error",
        duration: 5000,
      });
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
              <h3 className="text-sm text-hint">
                Invite frens to get bonuses!
              </h3>
              <h3 className="text-sm text-hint mb-2">
                Your frens: <strong className="text-white">0</strong>
              </h3>
              <div className="pt-2 w-full">
                <Chip mode="mono" className="w-full mb-2 h-[42px]">
                  <span className="flex justify-center items-center gap-2 text-hint">
                    <span>Copy referral link</span>{" "}
                    <ClipboardCopy className="relative top-[-1px]" size={18} />
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
