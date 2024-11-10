"use server";

import { Page } from "@/components/Page";
import React from "react";
import { List, Section } from "@telegram-apps/telegram-ui";
import { getRelease } from "@/helpers/api/release";
import NextImage from "next/image";
import clsx from "clsx";
import "./styles.scss";
import { ShareButton } from "@/components/Button/ShareButton";
import { ReleaseCover } from "@/components/Release/ReleaseCover/ReleaseCover";
import { ReleaseLinks } from "@/components/Release/ReleaseLinks/ReleaseLinks";
import { CardChip } from "@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardChip/CardChip";

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
      <NextImage
        className={clsx(
          "release__background animate__animated animate__fadeIn"
        )}
        src={release.coverUrl}
        width={release.width}
        height={release.height}
        alt={release.slug}
        priority={true}
      />
      <List className="relative z-2 p-2">
        <div className="mb-2 relative">
          <CardChip readOnly className="card-chip">
            {release.catalogNr}
          </CardChip>
          <ReleaseCover
            release={release}
            className="animate__animated animate__fadeIn"
          />
          <Section className="release__info">
            <div
              className={clsx(
                "px-3 pt-2.5 pb-3",
                "flex items-center justify-between gap-3"
              )}
            >
              <div>
                <h1 className="font-bold text-lg leading-none mb-2">
                  {release.artist}
                </h1>
                <h2 className="text-sm">{release.title}</h2>
              </div>
              <ShareButton release={release} />
            </div>
          </Section>
          <ReleaseLinks release={release} />
        </div>
      </List>
    </Page>
  );
}
