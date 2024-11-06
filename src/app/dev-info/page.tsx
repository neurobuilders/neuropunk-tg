"use client";

import { Section, Cell, Image, List } from "@telegram-apps/telegram-ui";
import { useTranslations } from "next-intl";

import { Link } from "@/components/Link/Link";
import { Page } from "@/components/Page";

export default function Home() {
  const t = useTranslations("i18n");

  return (
    <Page back={false}>
      <List>
        <Section
          header="Application Dev Info"
          footer="These pages help developer to learn more about current app information"
        >
          <Link href="/init-data">
            <Cell subtitle="User data, chat information, technical data">
              Init Data
            </Cell>
          </Link>
          <Link href="/launch-params">
            <Cell subtitle="Platform identifier, Mini Apps version, etc.">
              Launch Parameters
            </Cell>
          </Link>
          <Link href="/theme-params">
            <Cell subtitle="Telegram application palette information">
              Theme Parameters
            </Cell>
          </Link>
          <Link href="/session-data">
            <Cell subtitle="Next Auth user session data">Session Data</Cell>
          </Link>
        </Section>
      </List>
    </Page>
  );
}
