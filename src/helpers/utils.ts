import env from "@/env";
import * as Sentry from "@sentry/nextjs";

export const formatNumber = (num: number, minimumFractionDigits = 3) => {
  return num
    .toLocaleString("en", {
      minimumFractionDigits,
      maximumFractionDigits: 3,
      useGrouping: true,
    })
    .replace(/,/g, " ");
};

export const captureException = (err: any) => {
  try {
    console.error(err);
    Sentry.captureException(err);
  } catch (err2) {
    console.error(err2);
    Sentry.captureException(err2);
  }
};

export function getUrl(urlPart?: string, toString?: true): string;
export function getUrl(urlPart?: string, toString?: false): URL;
export function getUrl(urlPart?: string, toString = true): string | URL {
  const baseUrl = env.siteUrl;
  if (!urlPart) {
    return baseUrl;
  }
  const url = new URL(urlPart, baseUrl);
  if (toString) {
    return url.toString();
  }
  return url as URL;
}
