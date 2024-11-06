"use client";

import { List } from "@telegram-apps/telegram-ui";

import { DisplayData } from "@/components/DisplayData/DisplayData";
import { Page } from "@/components/Page";
import { useSession } from "next-auth/react";
import { ExtendedUser } from "@/types/next-auth";

export default function LaunchParamsPage() {
  const { data: session, status } = useSession({ required: false });
  console.log("session", session);

  const user = session?.user as ExtendedUser;

  return (
    <Page>
      <List>
        <DisplayData
          rows={[
            { title: "User database ID", value: user?.id },
            { title: "User first name", value: user?.firstName },
            { title: "User last name", value: user?.lastName },
            { title: "User name", value: session?.user?.name },
            { title: "User image", value: session?.user?.image },
            // { title: "tgWebAppShowSettings", value: lp.showSettings },
            // { title: "tgWebAppVersion", value: lp.version },
            // { title: "tgWebAppBotInline", value: lp.botInline },
            // { title: "tgWebAppStartParam", value: lp.startParam },
            // { title: "tgWebAppData", type: "link", value: "/init-data" },
            // {
            //   title: "tgWebAppThemeParams",
            //   type: "link",
            //   value: "/theme-params",
            // },
          ]}
        />
      </List>
    </Page>
  );
}
