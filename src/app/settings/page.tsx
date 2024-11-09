"use client";

import { Section, Cell, Image, List } from "@telegram-apps/telegram-ui";
import { useTranslations } from "next-intl";

import { Link } from "@/components/Link/Link";
import { LocaleSwitcher } from "@/components/LocaleSwitcher/LocaleSwitcher";
import { Page } from "@/components/Page";

import tonSvg from "@/app/_assets/ton.svg";

export default function SettingsPage() {
  const t = useTranslations("i18n");

  return (
    <Page id="settings" back={false}>
      <List>
        <Section
          header="Settings"
          footer="Explore and personalize your NeuroSpace experience"
        >
          <Link href="/ton-connect">
            <Cell
              before={
                <Image
                  src={tonSvg.src}
                  style={{ backgroundColor: "#007AFF" }}
                />
              }
              subtitle="Connect your TON wallet to access secure transactions and features in NeuroSpace"
            >
              TON Connect
            </Cell>
          </Link>
        </Section>

        <Section header={t("header")}>
          <LocaleSwitcher />
        </Section>

        <Link href="/dev-info">
          <Cell
            before={
              <Image
                src={"/logo.png"}
                className={"logo--neuropunk"}
                style={{ backgroundColor: "#007AFF" }}
              />
            }
            subtitle="Learn about our developer tools and resources"
          >
            Dev Info
          </Cell>
        </Link>

        <Section header="Coming Soon">
          <Cell subtitle="In-depth profile customization for a unique experience">
            Profile Customization (Coming Soon)
          </Cell>
          <Cell subtitle="Access exclusive content and rewards through a membership program">
            NeuroPass Membership (Coming Soon)
          </Cell>
        </Section>
      </List>
    </Page>
  );
}
