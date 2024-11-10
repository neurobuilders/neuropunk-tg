"use server";

import "server-only";
import { readJsonFile } from "@/helpers/mock";

export interface Artist {
  name: string;
  country: string;
  description?: string;
  url: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
}

export const getArtists = async () => {
  // return readJsonFile<Artist[]>("./src/mock-data/artists.json");
  return (await import("@/mock-data/artists.json")).default;
};
