"use client";

import { Release } from "@/helpers/api/release";
import clsx from "clsx";
import { Badge, Button, Cell, Section } from "@telegram-apps/telegram-ui";
import { Check } from "lucide-react";
import "./styles.scss";

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
    <Section className="release-links tasks" header="Tasks">
      {links.map((v, i) => {
        const isDisabled = i === 0;
        return (
          <Cell
            className={clsx("release-link", `release-link--${v.providerId}`)}
            disabled={isDisabled}
            before={<span className="release-link__image" role="image"></span>}
            after={
              <span className="release-link__after flex gap-4 items-center">
                {isDisabled ? (
                  <>
                    <span className="text-sm">+50</span>
                    <Button
                      mode="outline"
                      size="s"
                      className="px-2 py-1.5 h-auto"
                    >
                      <Check color="#8BC34A" size={20} />
                    </Button>
                  </>
                ) : (
                  <>
                    <span className="text-sm">50</span>
                    {/* <Badge
                      className="badge badge--invisible text-gray-500"
                      mode="gray"
                      type="number"
                      large={false}
                    >
                      50
                    </Badge> */}
                    <Button
                      mode="outline"
                      size="s"
                      className="px-2 py-1.5 h-auto"
                    >
                      Start
                    </Button>
                  </>
                )}
              </span>
            }
          >
            {v.providerName}
          </Cell>
          // </Link>
        );
      })}
    </Section>
  );
};
