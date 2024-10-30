"use client";

import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/Loader/Loader";
import { PrefetchKind } from "next/dist/client/components/router-reducer/router-reducer-types";

export default function IndexPage() {
  const t = useTranslations("i18n");
  const router = useRouter();

  useEffect(() => {
    import("@rive-app/react-canvas");

    // trying to preload critical endpoints
    router.prefetch("/", { kind: PrefetchKind.FULL });
    router.prefetch("/reactor", { kind: PrefetchKind.FULL });
    router.prefetch("/pass", { kind: PrefetchKind.FULL });
    router.prefetch("/settings", { kind: PrefetchKind.FULL });

    setTimeout(() => {
      router.replace("/home");
    }, 300);
  }, [router]);

  return <Loader />;
}
