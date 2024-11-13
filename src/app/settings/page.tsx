"use client";

import { Section, Cell, Image, List } from "@telegram-apps/telegram-ui";
import { useTranslations } from "next-intl";

import { Link } from "@/components/Link/Link";
import { LocaleSwitcher } from "@/components/LocaleSwitcher/LocaleSwitcher";
import { Page } from "@/components/Page";

import tonSvg from "@/app/_assets/ton.svg";
import { getUserManager } from "@/helpers/database";
import { useCallback } from "react";
import { ClickHandler } from "@telegram-apps/telegram-ui/dist/components/Service/Touch/Touch";
import { useToast } from "@/context/ToastContext";
import { useAppContext } from "@/context/AppContext";
import { getVersionString } from "@/helpers/utils";
import { uniqueId } from "lodash";

export default function SettingsPage() {
  const t = useTranslations("i18n");
  const { showToast } = useToast();
  const { initUserData, setInitUserData, setEnergyAmount } = useAppContext();

  const clearUserDataHandler: ClickHandler = useCallback(async (e) => {
    const uManager = getUserManager();
    await uManager.clearUserData();
    setEnergyAmount(0);
    setInitUserData({
      ...initUserData,
      ver: uniqueId("ver_"),
    } as any);
    // try {
    //   if (!initUserData?.id) {
    //     return;
    //   }
    //   const defaultUser = getDefaultUser(initUserData?.id);
    // } catch (err) {
    //   captureException(err);
    // }

    showToast({
      title: "Success",
      message: "User data has been cleared successfully.",
      type: "success",
      duration: 2000,
    });
  }, []);

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

        <Section header="Actions">
          <Cell
            multiline={true}
            subtitle="This will clear the database with all balances, transactions and then set the default values"
            onClick={clearUserDataHandler}
          >
            Clear user data storage
          </Cell>
        </Section>

        <Section>
          <Cell subtitle={getVersionString()}>Version</Cell>
        </Section>
      </List>
    </Page>
  );
}
