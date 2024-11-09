"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { triggerHapticFeedback } from "@/helpers/telegram";
import { Event } from "@/helpers/api/events";
import { Button } from "@telegram-apps/telegram-ui";
import { openLink } from "@telegram-apps/sdk-react";
import clsx from "clsx";

interface EventsListProps {
  events: Event[];
}

export default function EventsList(props: EventsListProps) {
  const { events } = props;
  const t = useTranslations("i18n");

  return (
    <div className={clsx("events events--upcoming", "px-5 pb-5 mt-2 mb-2")}>
      <ul className="flex flex-col gap-2 items-center justify-center">
        {events.map((v) => (
          <li
            key={v.url}
            className="w-full border-2 border-gray-700 rounded-xl"
          >
            <div className="flex justify-between p-5 gap-2">
              <div className="col-span-5 md:col-span-4">
                <p className="text-sky-500 font-bold text-xs">{v.date}</p>
                <p className="text-gray-400 font-bold leading-none mt-1 mb-1">
                  {v.title}
                </p>
                <p className="text-gray-600 text-sm">{v.location}</p>
                {/* <p className="text-gray-400"> Beginner speakers </p> */}
              </div>
              <div className="flex flex-col justify-center">
                <Button
                  mode="bezeled"
                  size="s"
                  onClick={() => {
                    triggerHapticFeedback();
                    openLink(v.url);
                  }}
                >
                  More Info
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
