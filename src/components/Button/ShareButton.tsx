"use client";

import { Release } from "@/helpers/api/release";
import { shareURL } from "@telegram-apps/sdk-react";
import { Share2 } from "lucide-react";
import { MouseEventHandler, useCallback } from "react";

interface ShareButtonProps {
  release?: Release;
}

export const ShareButton = (props: ShareButtonProps) => {
  const { release } = props;
  const shareButtonHandler: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault();
      if (!release) {
        return;
      }
      shareURL(window.location.href, `${release.artist} - ${release.title}`);
    },
    []
  );
  return (
    <button type="button" onClick={shareButtonHandler}>
      <Share2 color="#fff" size={24} />
    </button>
  );
};
