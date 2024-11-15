import { triggerHapticFeedback } from "@/helpers/telegram";
import { Card, Spinner } from "@telegram-apps/telegram-ui";
import { CardChip } from "@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardChip/CardChip";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { captureException } from "@sentry/nextjs";
import { CardCell } from "@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell";
import { Release } from "@/helpers/api/release";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import "./styles.scss";

interface ReleaseItemProps {
  release: Release;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  isDisabled?: boolean;
}

export const ReleaseItem = (props: ReleaseItemProps) => {
  const { isDisabled, release, onClick } = props;
  const router = useRouter();
  const imageRef = useRef<HTMLImageElement>(null);
  const [isLoading, setLoading] = useState(false);

  return (
    <Card
      onClick={(e) => {
        if (onClick) {
          onClick(e);
        }
        if (isLoading || isDisabled) {
          return;
        }
        const url = `/release/${release.slug}`;
        setLoading(true);
        router.push(url);
        triggerHapticFeedback();
      }}
      className={clsx("release-item", {
        ["is-loading"]: isLoading,
        // ["is-loading"]: true,
      })}
    >
      <CardChip readOnly className="card-chip">
        {release.catalogNr}
      </CardChip>
      <div className="relative cover-container">
        <Image
          ref={imageRef}
          src={release.coverUrl}
          alt={release.title}
          width={release.width}
          height={release.height}
          priority={true}
        />
        {release.videoUrl && (
          <video
            playsInline
            muted
            autoPlay
            loop
            className="hidden"
            width="100%"
            preload=""
            onPlay={(e) => {
              (e.target as any)?.classList.remove("hidden");
              imageRef.current?.classList.add("hidden");
            }}
            onCanPlayThrough={async (e) => {
              try {
                await (e.target as any)?.play();
              } catch (err) {
                captureException(err);
              }
            }}
          >
            <source src={release.videoUrl} type="video/webm" />
          </video>
        )}
      </div>
      <CardCell readOnly subtitle={release.artist} className="card-cell">
        {release.title}
      </CardCell>
      <div
        className={clsx(
          "loading",
          "absolute z-10 top-0 right-0 bottom-0 left-0 pb-10",
          "flex justify-center items-center"
        )}
      >
        <Spinner className="relative z-20" size="l" />
      </div>
    </Card>
  );
};
