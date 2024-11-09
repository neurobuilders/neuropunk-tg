"use server";

import "server-only";
import { readJsonFile } from "@/helpers/mock";

export interface Release {
  title: string;
  coverUrl: string;
  videoUrl: string;
  artist: string;
  catalogNr: string;
  url: string;
  width: number;
  height: number;
}

export const getReleases = () => {
  return readJsonFile<Release[]>("./src/mock-data/releases.json");
};
