"use client";

import { useTranslations } from "next-intl";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button, Placeholder } from "@telegram-apps/telegram-ui";
import { NeuropunkRive } from "@/components/NeuropunkRive";
import { retrieveLaunchParams } from "@telegram-apps/sdk";

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
  }, [router]);

  const clickHandler = () => {
    fetch("/api/auth/sign-up", {
      method: "post",
      headers: {
        Authorization: `twa ${initDataRaw}`,
      },
    }).then(async (res) => {
      const json = await res.json();
      if (json.ok) {
        router.replace("/");
      }
    });
  };

  return (
    <Placeholder
      action={
        <Button size="l" stretched onClick={clickHandler}>
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
