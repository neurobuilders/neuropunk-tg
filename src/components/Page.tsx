"use client";

import { backButton, initData, useSignal } from "@telegram-apps/sdk-react";
import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { BottomNavigation } from "./BottomNavigation/BottomNavigation";
import Head from "next/head";
// @ts-ignore
import riveWASMResource from "@rive-app/canvas/rive.wasm";
import Navbar from "@/components/Navbar/Navbar";
import { Drawer } from "@/components/Drawer/Drawer";
import { useAppContext } from "@/context/AppContext";

interface PageProps {
  /**
   * True if it is allowed to go back from this page.
   * @default true
   */
  back?: boolean;
  id?: string;
}

export function Page({
  children,
  id,
  back = true,
}: PropsWithChildren<PageProps>) {
  const router = useRouter();
  const initDataState = useSignal(initData.state);
  const { setInitUserData } = useAppContext();

  useEffect(() => {
    const initUser = async () => {
      try {
        console.log("initDataState", initDataState?.user);
        setInitUserData(initDataState?.user);
      } catch (err) {
        console.error(err);
      }
    };
    initUser();
  }, [initDataState]);

  useEffect(() => {
    if (back) {
      backButton.show();
    } else {
      backButton.hide();
    }
  }, [back]);

  useEffect(() => {
    return backButton.onClick(() => {
      router.back();
    });
  }, [router]);

  useEffect(() => {
    if (id) {
      document.body.classList.add(`page--${id}`);
    }
  }, [id]);

  return (
    <>
      <Navbar />
      <Head>
        <link
          key="preload-riveWASMResource"
          rel="preload"
          href={riveWASMResource}
          as="fetch"
          crossOrigin="anonymous"
        />
        <link
          key="preload-neuropunk.riv"
          rel="preload"
          href="/neuropunk.riv"
          as="fetch"
          crossOrigin="anonymous"
        />
      </Head>
      <div
        className={clsx("page", {
          [`page-${id}`]: id,
        })}
      >
        {children}
      </div>
      <Drawer />
      <BottomNavigation />
    </>
  );
}
