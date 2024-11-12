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

export default function GamesPage() {
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
              <h3 className="text-2xl font-bold mb-2">Games</h3>
            </div>
          </div>
        </Section>
      </List>
    </Page>
  );
}
