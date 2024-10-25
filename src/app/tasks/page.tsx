"use client";

import { useTranslations } from "next-intl";
import { Page } from "@/components/Page";
import React from "react";
import Rive from "@rive-app/react-canvas";
import { Layout, Fit } from "@rive-app/canvas";

const layout = new Layout({
  fit: Fit.FitHeight,
});

export default function Tasks() {
  const t = useTranslations("i18n");

  return (
    <Page back={false}>
      <Rive
        layout={layout}
        style={
          {
            // minHeight: "100%",
            // zoom: "1",
            // margin: "-62px 0 0 -47px",
          }
        }
        src="/rives/loading_bar.riv"
        stateMachines={["State Machine 1"]}
      />
    </Page>
  );
}
