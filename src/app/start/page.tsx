"use client";

import { useTranslations } from "next-intl";

import { Page } from "@/components/Page";

import React from "react";
import Rive from "@rive-app/react-canvas";

export default function StartPage() {
  const t = useTranslations("i18n");

  return (
    <Page id="start" back={true}>
      <Rive
        style={{
          minHeight: "500px",
          backgroundColor: "black",
        }}
        src="/rives/happy_halloween.riv"
        stateMachines={["State Machine 1"]}
      />
    </Page>
  );
}
