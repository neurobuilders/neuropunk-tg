"use client";

import { Section, Cell, Image, List } from "@telegram-apps/telegram-ui";
import { useTranslations } from "next-intl";

import { Link } from "@/components/Link/Link";
import { LocaleSwitcher } from "@/components/LocaleSwitcher/LocaleSwitcher";
import { Page } from "@/components/Page";

import tonSvg from "@/app/_assets/ton.svg";

export default function Tasks() {
  const t = useTranslations("i18n");

  return (
    <Page back={false}>
      <List>



      </List>
    </Page>
  );
}
