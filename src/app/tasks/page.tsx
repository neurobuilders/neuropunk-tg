"use client";

import { Section, Cell, Image, List } from "@telegram-apps/telegram-ui";
import { useTranslations } from "next-intl";

import { Link } from "@/components/Link/Link";
import { LocaleSwitcher } from "@/components/LocaleSwitcher/LocaleSwitcher";
import { Page } from "@/components/Page";

import tonSvg from "@/app/_assets/ton.svg";
import {DotLottieReact} from "@lottiefiles/dotlottie-react";
import React from "react";
import Rive from "@rive-app/react-canvas";

export default function Tasks() {
  const t = useTranslations("i18n");

  return (
    <Page back={false}>
        <Rive
            style={{
                minHeight: '900px',
                marginBottom: '6px',
                marginTop: '3px',
            }}
            src="/cute_monster.riv"
            stateMachines="IDLE"
        />
    </Page>
  );
}
