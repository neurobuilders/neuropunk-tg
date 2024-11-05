"use client";

import { useTranslations } from "next-intl";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/Loader/Loader";
import { retrieveLaunchParams } from "@telegram-apps/sdk";
import { PrefetchKind } from "next/dist/client/components/router-reducer/router-reducer-types";
import { getCsrfToken, getProviders, signIn } from "next-auth/react";
import { apiBaseUrl } from "next-auth/client/_utils";

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

    signIn("telegram-login", { redirect: false, initDataRaw }).then((res) => {
      // if (!res) return;
      // const { url } = res;
      // if (!url) return;
      // fetch(url, {
      //   method: "GET",
      // });
    });
  }, [initDataRaw, router]);

  return <Loader />;
}
