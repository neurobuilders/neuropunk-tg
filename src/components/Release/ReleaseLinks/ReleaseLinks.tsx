"use client";

import { Release } from "@/helpers/api/release";
import clsx from "clsx";
import { Button, Cell, Section } from "@telegram-apps/telegram-ui";
import { Link } from "@/components/Link/Link";
import Image from "next/image";
import "./styles.scss";
import { triggerHapticFeedback } from "@/helpers/telegram";

interface ReleaseLinksProps {
  release?: Release;
}

export const ReleaseLinks = (props: ReleaseLinksProps) => {
  const { release } = props;
  if (!release) {
    return;
  }

  const { links } = release;

  if (!links || !links.length) {
    return;
  }

  return (
    <Section className="release__links">
      {links.map((v) => (
        <Link
          key={v.url}
          href={v.url}
          className={clsx("release__link", `release__link--${v.providerId}`)}
          onClick={() => {
            triggerHapticFeedback();
          }}
        >
          <Cell
            className="px-3"
            before={
              <span className="release__link-image" role="image"></span>
              // <Image
              //   src={`/icons/providers/${v.providerId}.svg`}
              //   height={28}
              //   width={28}
              //   alt={v.providerName}
              // />
            }
            after={
              <Button size="s" mode="gray" className="min-w-[80px] h-[32px]">
                {v.label}
              </Button>
            }
          >
            {v.providerName}
          </Cell>
        </Link>
      ))}
    </Section>
  );
};
