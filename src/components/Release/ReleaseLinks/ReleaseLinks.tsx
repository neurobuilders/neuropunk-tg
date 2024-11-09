"use client";

import { Release } from "@/helpers/api/release";
import { captureException } from "@/helpers/utils";
import { useState } from "react";
import clsx from "clsx";
import {
  Avatar,
  Button,
  Cell,
  Section,
  Image,
} from "@telegram-apps/telegram-ui";
import { Link } from "@/components/Link/Link";

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
        <Link href={v.url}>
          <Cell
            className="px-3"
            before={
              <Avatar className="link__avatar" size={40}>
                <Image src={"/logo.png"} size={24} alt="Neuropunk Premium" />
              </Avatar>
            }
            after={
              <Button size="s" stretched>
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
