"use client";

import { useTranslations } from "next-intl";

import { Page } from "@/components/Page";

import React from "react";

interface ReleasePageProps {
  params: {
    slug: string;
  };
}

export default function ReleasePage({ params }: ReleasePageProps) {
  const { slug } = params;
  const t = useTranslations("i18n");

  return (
    <Page id="start" back={true}>
      RELEASE PAGE
    </Page>
  );
}
