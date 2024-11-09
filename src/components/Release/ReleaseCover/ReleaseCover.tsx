"use client";

import { Release } from "@/helpers/api/release";
import { captureException } from "@/helpers/utils";
import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";

interface ReleaseCoverProps {
  release?: Release;
}

export const ReleaseCover = (props: ReleaseCoverProps) => {
  const [showVideo, setShowVideo] = useState(false);
  const { release } = props;
  if (!release) {
    return;
  }

  return (
    <>
      {!showVideo && (
        <Image
          className={clsx("release__cover")}
          src={release.coverUrl}
          width={release.width}
          height={release.height}
          alt={release.slug}
          priority={true}
        />
      )}
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
            setShowVideo(true);
          }}
          onCanPlayThrough={async (e) => {
            try {
              await (e.target as any)?.play();
              (e.target as any)?.classList.remove("hidden");
            } catch (err) {
              captureException(err);
            }
          }}
        >
          <source src={release.videoUrl} type="video/webm" />
        </video>
      )}
    </>
  );
};
