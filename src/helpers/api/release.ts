"use server";

import "server-only";
import { readJsonFile } from "@/helpers/mock";

export interface Release {
  slug: string;
  title: string;
  coverUrl: string;
  videoUrl: string;
  artist: string;
  catalogNr: string;
  url: string;
  width: number;
  height: number;
  links?: {
    url: string;
    providerId: string;
    label: string;
    providerName: string;
  }[];
}

export const getReleases = () => {
  return readJsonFile<Release[]>("./src/mock-data/releases.json");
};

export const getRelease = async (slug: string) => {
  const releases = await getReleases();
  return releases.find((v) => v.slug === slug);
};
