"use server";

import { useTranslations } from "next-intl";

import { Page } from "@/components/Page";
import React from "react";
import { List, Section } from "@telegram-apps/telegram-ui";
import { getRelease } from "@/helpers/api/release";
import Image from "next/image";
import clsx from "clsx";
import "./styles.scss";
import { ShareButton } from "@/components/Button/ShareButton";
import { ReleaseCover } from "@/components/Release/ReleaseCover/ReleaseCover";

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

  console.log("release", release);

  return (
    <Page id="release" back={true}>
      <Image
        className={clsx("release__background")}
        src={release.coverUrl}
        width={release.width}
        height={release.height}
        alt={release.slug}
        priority={true}
      />
      <List className="relative z-2 p-4">
        <div>
          <ReleaseCover release={release} />
          <Section>
            <div className="px-3 py-2 flex items-center justify-between">
              <div>
                <h1 className="font-bold text-lg">{release.artist}</h1>
                <h2 className="text-sm">{release.title}</h2>
              </div>
              <div>
                <ShareButton release={release} />
              </div>
            </div>
          </Section>
        </div>
      </List>
    </Page>
  );
}
