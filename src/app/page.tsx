"use client";

import { useTranslations } from "next-intl";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/Loader/Loader";
import { retrieveLaunchParams } from "@telegram-apps/sdk";
import { PrefetchKind } from "next/dist/client/components/router-reducer/router-reducer-types";
import { signIn } from "next-auth/react";

export default function IndexPage() {
  const t = useTranslations("i18n");
  const router = useRouter();
  const { initDataRaw } = retrieveLaunchParams();
  const isLoaded = useRef(false);

  useEffect(() => {
    if (isLoaded.current) {
      return;
    }
    isLoaded.current = true;

    import("@rive-app/react-canvas");
    // trying to preload critical endpoints
    router.prefetch("/", { kind: PrefetchKind.FULL });
    router.prefetch("/reactor", { kind: PrefetchKind.FULL });
    router.prefetch("/pass", { kind: PrefetchKind.FULL });
    router.prefetch("/settings", { kind: PrefetchKind.FULL });

    signIn("tg-miniapp", { redirect: false, initDataRaw }).then((res) => {
      if (!res) return;
      const { ok, error } = res;
      if (ok) {
        router.replace("/home");
      }
    });
  }, [initDataRaw, router]);

  return <Loader />;
}
