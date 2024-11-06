"use client";

import { useTranslations } from "next-intl";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { retrieveLaunchParams } from "@telegram-apps/sdk";
import { Button, Placeholder } from "@telegram-apps/telegram-ui";
import { NeuropunkRive } from "@/components/NeuropunkRive";

export default function WelcomePage() {
  const t = useTranslations("i18n");
  const router = useRouter();
  const { initDataRaw } = retrieveLaunchParams();
  const isLoaded = useRef(false);

  useEffect(() => {
    if (isLoaded.current) {
      return;
    }
    isLoaded.current = true;
  }, [initDataRaw, router]);

  return (
    <Placeholder
      action={
        <Button size="l" stretched>
          Step into the Future
        </Button>
      }
      description={
        <div className="mb-3 mt-7">
          Here, we embrace a new frontier where cybernetic augmentation,
          cutting-edge neuroscience, and counter-culture aesthetics converge to
          create a digital sanctuary for visionaries, innovators, and futurists.
        </div>
      }
      header="Welcome to the Neuropunk Space"
    >
      <NeuropunkRive />
    </Placeholder>
  );
}
