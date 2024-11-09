"use server";

import "server-only";
import { readJsonFile } from "@/helpers/mock";

export interface Event {
  title: string;
  date: string;
  location: string;
  url: string;
}

export const getEvents = () => {
  return readJsonFile<Event[]>("./src/mock-data/events.json");
};
