"use client";

import { backButton } from "@telegram-apps/sdk-react";
import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

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
    <div
      className={clsx("page", {
        [`page-${id}`]: id,
      })}
    >
      {children}
    </div>
  );
}
