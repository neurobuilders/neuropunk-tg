"use client";

import { useTranslations } from "next-intl";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button, Placeholder } from "@telegram-apps/telegram-ui";
import { NeuropunkRive } from "@/components/NeuropunkRive";
import { retrieveLaunchParams } from "@telegram-apps/sdk";
import { useToast } from "@/context/ToastContext";
import { captureException } from "@/helpers/utils";
import { triggerHapticFeedback } from "@/helpers/telegram";

export default function WelcomePage() {
  const t = useTranslations("i18n");
  const router = useRouter();
  const { showToast } = useToast();
  const { initDataRaw } = retrieveLaunchParams();
  const isLoaded = useRef(false);

  useEffect(() => {
    if (isLoaded.current) {
      return;
    }
    isLoaded.current = true;
  }, [router]);

  const clickHandler = () => {
    triggerHapticFeedback();
    fetch("/api/auth/sign-up", {
      method: "post",
      headers: {
        Authorization: `twa ${initDataRaw}`,
      },
    }).then(async (res) => {
      const json = await res.json();
      const { ok, error } = json;
      if (ok) {
        router.replace("/");

        showToast({
          title: "Welcome to the Neuropunk Space",
          message: (
            <>
              We have awarded you <strong>2 Neuro Energy</strong>. For more
              information, visit <Button size="s">Reactor</Button>.
            </>
          ),
          type: "success",
          duration: 7000,
        });
      } else {
        captureException(error);
        showToast({
          title: "Error occured",
          message: error,
          type: "error",
          duration: 5000,
        });
      }
    });
  };

  return (
    <Placeholder
      action={
        <Button size="l" stretched onClick={clickHandler} loading={true}>
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
