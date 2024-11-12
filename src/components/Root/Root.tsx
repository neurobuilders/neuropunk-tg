"use client";

import { type PropsWithChildren, useEffect } from "react";
import {
  initData,
  miniApp,
  useLaunchParams,
  useSignal,
} from "@telegram-apps/sdk-react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { AppRoot } from "@telegram-apps/telegram-ui";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ErrorPage } from "@/components/ErrorPage";
import { useTelegramMock } from "@/hooks/useTelegramMock";
import { useDidMount } from "@/hooks/useDidMount";
import { useClientOnce } from "@/hooks/useClientOnce";
import { setLocale } from "@/core/i18n/locale";
import { init } from "@/core/init";
import { SessionProvider } from "next-auth/react";

import "./styles.css";
import { Loader } from "@/components/Loader/Loader";
import { usePathname } from "next/navigation";
import slugify from "slugify";
import { ToastProvider } from "@/context/ToastContext";
import { AppProvider } from "@/context/AppContext";
import env from "@/env";

function RootInner({ children }: PropsWithChildren) {
  const isDev = process.env.NODE_ENV === "development";
  const pathname = usePathname();

  // Mock Telegram environment in development mode if needed.
  if (isDev) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTelegramMock();
  }

  const lp = useLaunchParams();
  const debug = isDev || lp.startParam === "debug";

  // Initialize the library.
  useClientOnce(() => {
    init(debug);
  });

  const isDark = useSignal(miniApp.isDark);
  const initDataUser = useSignal(initData.user);

  // Set the user locale.
  useEffect(() => {
    initDataUser && setLocale(initDataUser.languageCode);
  }, [initDataUser]);

  // Enable debug mode to see all the methods sent and events received.
  useEffect(() => {
    if (env.app.erudaDisabled) {
      return;
    }
    debug && import("eruda").then((lib) => lib.default.init());
  }, [debug]);

  useEffect(() => {
    const pageClassName = `page-slug--${slugify(pathname)}`;
    let willAdd = true;
    for (const className of Array.from(document.body.classList.values())) {
      if (className.startsWith("page-slug--")) {
        if (className === pageClassName) {
          willAdd = false;
        } else {
          document.body.classList.remove(className);
        }
      }
    }
    if (willAdd && pathname) {
      document.body.classList.add(pageClassName);
    }
  }, [pathname]);

  return (
    <TonConnectUIProvider manifestUrl="https://neuropunk-tg.vercel.app/tonconnect-manifest.json">
      <AppRoot
        // appearance={isDark ? "dark" : "light"}
        appearance={"dark"}
        platform={["macos", "ios"].includes(lp.platform) ? "ios" : "base"}
        className="app-root"
      >
        <ToastProvider>
          <AppProvider>
            <SessionProvider>{children}</SessionProvider>
          </AppProvider>
        </ToastProvider>
      </AppRoot>
    </TonConnectUIProvider>
  );
}

export function Root(props: PropsWithChildren) {
  // Unfortunately, Telegram Mini Apps does not allow us to use all features of
  // the Server Side Rendering. That's why we are showing loader on the server
  // side.
  const didMount = useDidMount();

  return didMount ? (
    <ErrorBoundary fallback={ErrorPage}>
      <RootInner {...props} />
    </ErrorBoundary>
  ) : (
    <Loader />
  );
}
