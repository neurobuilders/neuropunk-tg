"use server";

import { Page } from "@/components/Page";
import React from "react";
import {
  Cell,
  Headline,
  Info,
  List,
  Section,
  Subheadline,
} from "@telegram-apps/telegram-ui";
import { getRelease } from "@/helpers/api/release";
import NextImage from "next/image";
import clsx from "clsx";
import "./styles.scss";
import { ReleaseCover } from "@/components/Release/ReleaseCover/ReleaseCover";
import { ReleaseLinks } from "@/components/Release/ReleaseLinks/ReleaseLinks";
import { CardChip } from "@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardChip/CardChip";
import ReleaseCard from "@/components/Release/ReleaseCard/ReleaseCard";

interface ReleasePageProps {
  params: {
    slug: string;
  };
}

export default async function ReleasePage(props: ReleasePageProps) {
  const { params } = props;
  const { slug } = params;
  // const slug = "a";
  // const t = useTranslations("i18n");
  const release = await getRelease(slug);

  if (!release) {
    return <div>${slug} - 404 NOT FOUND</div>;
  }

  return (
    <Page id="release" back={true}>
      <div className="release__background">
        <NextImage
          className={clsx(" animate__animated animate__fadeIn")}
          src={release.coverUrl}
          width={release.width}
          height={release.height}
          alt={release.slug}
          priority={true}
        />
      </div>

      <List className="relative z-2 p-4">
        {/* <div className="mb-4 relative"> */}
        <ReleaseCard release={release}></ReleaseCard>
        <ReleaseLinks release={release} />
        {/* </div> */}
      </List>
    </Page>
  );
}
