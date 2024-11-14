"use client";

import { useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Placeholder } from "@telegram-apps/telegram-ui";
import { NeuropunkRive } from "@/components/NeuropunkRive";
import { retrieveLaunchParams } from "@telegram-apps/sdk";
import { useToast } from "@/context/ToastContext";
import { captureException } from "@/helpers/utils";
import { triggerHapticFeedback } from "@/helpers/telegram";
import { getUserManager, getUserTransactionsManager } from "@/helpers/database";
import { Transaction } from "@/helpers/database/models/transaction";
import { User } from "@/helpers/database/models/user";
import { useAppContext } from "@/context/AppContext";
import { neuroEnergyWelcomeAmount } from "@/helpers/constants";

export default function WelcomePage() {
  const t = useTranslations("i18n");
  const router = useRouter();
  const { showToast, hideToast } = useToast();
  const { initDataRaw } = retrieveLaunchParams();
  const isLoaded = useRef(false);
  const { setEnergyAmount } = useAppContext();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoaded.current) {
      return;
    }
    isLoaded.current = true;
  }, [router]);

  const clickHandler = () => {
    triggerHapticFeedback();
    setLoading(true);

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

        const transactionsManager = getUserTransactionsManager();
        const transaction = new Transaction({
          amount: neuroEnergyWelcomeAmount,
        });
        const isChanged = await transactionsManager.addTransaction(transaction);
        if (isChanged) {
          const uManager = getUserManager();
          let dbUserData = await uManager.getUserData();

          const currentUser = User.fromJSON(dbUserData);
          currentUser.energyAmount = neuroEnergyWelcomeAmount;

          await uManager.saveUserData(currentUser);
          setEnergyAmount(neuroEnergyWelcomeAmount);

          const toastId = "welcome-toast";

          showToast({
            id: toastId,
            title: "Welcome to the Neuropunk Space",
            message: (
              <>
                We have awarded you <strong>2 Neuro Energy</strong> as a welcome
                bonus.
                <br />
                For more information, visit Reactor
                <div className="flex justify-end mt-1">
                  <Button
                    size="s"
                    mode="white"
                    className="px-2 py-0 h-auto text-black !leading-none"
                    onClick={(e) => {
                      e.preventDefault();
                      triggerHapticFeedback("light");
                      router.push("/reactor");
                      hideToast(toastId);
                    }}
                  >
                    <span className="leading-none">Reactor</span>
                  </Button>
                </div>
              </>
            ),
            type: "success",
            duration: 7000,
          });
        }
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
        <Button size="l" stretched onClick={clickHandler} loading={isLoading}>
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
