"use server";

import "server-only";

export interface ReleaseLink {
  url: string;
  providerId: string;
  isCompleted?: boolean;
  label: string;
  providerName: string;
  neAmount?: number;
}

export interface Release {
  slug: string;
  title: string;
  coverUrl: string;
  videoUrl?: string;
  artist: string;
  catalogNr: string;
  url: string;
  width: number;
  height: number;
  links?: ReleaseLink[];
}

export const getReleases = async () => {
  // return readJsonFile<Release[]>("./src/mock-data/releases.json");
  return (await import("@/mock-data/releases.json")).default;
};

export const getRelease = async (slug: string) => {
  const releases = await getReleases();
  return releases.find((v) => v.slug === slug);
};
