"use client";

import { Release, ReleaseLink } from "@/helpers/api/release";
import clsx from "clsx";
import { Badge, Button, Cell, Section } from "@telegram-apps/telegram-ui";
import { Check } from "lucide-react";
import "./styles.scss";
import { useCallback, MouseEvent } from "react";
import { getUserTasksManager } from "@/helpers/database";
import { TaskStatus } from "@/helpers/database/models/tasks";
import { useToast } from "@/context/ToastContext";
import { useAppContext } from "@/context/AppContext";

const defaultTaskNeuroEnergyAmount = 50;

interface ReleaseLinksProps {
  release?: Release;
}

export const ReleaseLinks = (props: ReleaseLinksProps) => {
  const { release } = props;
  const { links } = release || {};
  const { setEnergyAmount } = useAppContext();

  const userTasksDataManager = getUserTasksManager();
  const { showToast } = useToast();

  const clickHandler = useCallback(
    async (releaseLink: ReleaseLink, e: MouseEvent<HTMLButtonElement>) => {
      const amount = releaseLink.neAmount ?? defaultTaskNeuroEnergyAmount;
      await userTasksDataManager.updateTaskStatus(
        `release-${releaseLink.url}`,
        TaskStatus.Loading
      );
      setEnergyAmount((prev) => prev + amount);

      showToast({
        title: "Success",
        message: (
          <>
            You&apos;ve received <strong>{amount} Neuro Energy</strong>
          </>
        ),
        type: "success",
        duration: 2000,
      });
    },
    []
  );

  return (
    <Section className="release-links tasks" header="Tasks">
      {links?.map((v, i) => {
        const isCompleted = false;
        return (
          <Cell
            key={v.url}
            className={clsx("release-link", `release-link--${v.providerId}`)}
            disabled={isCompleted}
            before={<span className="release-link__image" role="image"></span>}
            after={
              <span className="release-link__after flex gap-4 items-center">
                {isCompleted ? (
                  <>
                    <span className="text-sm">+50</span>
                    <Button
                      mode="outline"
                      size="s"
                      className="px-2 py-1.5 h-auto"
                      onClick={clickHandler.bind(this, v)}
                    >
                      <Check color="#8BC34A" size={20} />
                    </Button>
                  </>
                ) : (
                  <>
                    <span className="text-sm">50</span>
                    <Button
                      mode="outline"
                      size="s"
                      className="px-2 py-1.5 h-auto"
                      onClick={clickHandler.bind(this, v)}
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
