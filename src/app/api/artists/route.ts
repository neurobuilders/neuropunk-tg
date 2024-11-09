import { readJsonFile } from "@/helpers/mock";
import { NextRequest } from "next/server";

export interface Artist {
  name: string;
  country: string;
  description: string;
  url: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
}

export async function GET(request: NextRequest) {
  return await readJsonFile<Artist[]>("./src/mock-data/artists.json");
}
