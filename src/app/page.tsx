"use client";

import { useTranslations } from "next-intl";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/Loader/Loader";
import { retrieveLaunchParams } from "@telegram-apps/sdk";
import { PrefetchKind } from "next/dist/client/components/router-reducer/router-reducer-types";
import { signIn } from "next-auth/react";
import { captureException } from "@/helpers/utils";

export default function IndexPage() {
  const t = useTranslations("i18n");
  const router = useRouter();
  const { initDataRaw } = retrieveLaunchParams();
  const isLoaded = useRef(false);
  const isPreloaded = useRef(false);

  const preload = () => {
    try {
      if (isPreloaded.current) {
        return;
      }
      import("@rive-app/react-canvas");
      // router.prefetch("/neuropunk.riv");
      // trying to preload critical endpoints
      router.prefetch("/welcome", { kind: PrefetchKind.FULL });
      router.prefetch("/", { kind: PrefetchKind.FULL });
      router.prefetch("/reactor", { kind: PrefetchKind.FULL });
      router.prefetch("/pass", { kind: PrefetchKind.FULL });
      router.prefetch("/settings", { kind: PrefetchKind.FULL });
      isPreloaded.current = true;
    } catch (err) {
      captureException(err);
    }
  };

  useEffect(() => {
    if (isLoaded.current) {
      return;
    }
    isLoaded.current = true;

    preload();

    signIn("tg-miniapp", { redirect: false, initDataRaw }).then((res) => {
      if (!res) return;
      const { ok, error, code } = res;
      if (error) {
        if (code === "not-found-user") {
          router.replace("/welcome");
        }
      } else if (ok) {
        if (isPreloaded.current) {
          router.replace("/home");
        } else {
          preload();
          setTimeout(() => {
            router.replace("/home");
          }, 300);
        }
      }
    });
  }, [initDataRaw, router]);

  return <Loader />;
}
