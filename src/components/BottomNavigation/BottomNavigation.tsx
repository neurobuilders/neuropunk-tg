"use client";

import { Tabbar } from "@telegram-apps/telegram-ui";
import { House, Info } from "lucide-react";
import {
  FC,
  MouseEvent,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import { openLink } from "@telegram-apps/sdk-react";
import { useRouter } from "next/navigation";

interface Tab {
  id: string;
  text: string;
  href: string;
  Icon: typeof House;
}

const tabs: Tab[] = [
  {
    id: "home",
    text: "Home",
    href: "/",
    Icon: House,
  },
  {
    id: "debug",
    text: "TG Info",
    href: "/tg-info",
    Icon: Info,
  },
];

export const BottomNavigation: FC = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0].id);
  const router = useRouter();

  const onClick = useCallback(
    (tab: Tab, e: MouseEvent<HTMLButtonElement>) => {
      const { href } = tab;
      // Compute if target path is external. In this case we would like to open link using
      // TMA method.
      let path: string;
      if (typeof href === "string") {
        path = href;
      } else {
        const { search = "", pathname = "", hash = "" } = href;
        path = `${pathname}?${search}#${hash}`;
      }

      const targetUrl = new URL(path, window.location.toString());
      const currentUrl = new URL(window.location.toString());
      const isExternal =
        targetUrl.protocol !== currentUrl.protocol ||
        targetUrl.host !== currentUrl.host;

      e.preventDefault();
      if (isExternal) {
        openLink(targetUrl.toString());
      } else {
        router.push(targetUrl.toString());
      }
    },
    [router]
  );

  return (
    <Tabbar>
      {tabs.map((props) => {
        const { id, text, Icon } = props;
        return (
          <Tabbar.Item
            key={id}
            text={text}
            selected={id === currentTab}
            onClick={onClick.bind(this, props)}
          >
            <Icon />
          </Tabbar.Item>
        );
      })}
    </Tabbar>
  );
};
