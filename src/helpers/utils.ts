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

export const captureException = (err: any, message?: string) => {
  try {
    console.error(`${message}: `, err);
    Sentry.captureException(err, {
      ...(message && { originalException: new Error(message) }),
    });
  } catch (err2) {
    console.error("captureException error: ", err2);
    Sentry.captureException(err2, { originalException: err });
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

export function isStorageAvailable(storage = globalThis.localStorage) {
  try {
    const key = "__storage_test__";
    storage.setItem(key, key);
    storage.removeItem(key);
    return true;
  } catch (err) {
    captureException(err);
    return false;
  }
}

export const getVersionString = () => {
  const parts = [
    `v${env.app.version}`,
    env.vercel.gitCommitRef && `- #${env.vercel.gitCommitRef}`,
    env.vercel.gitCommitSha &&
      `(${shortenCommitHash(env.vercel.gitCommitSha)})`,
  ];
  return parts.join(" ");
};

/**
 * Shortens a commit hash to a specified format.
 *
 * @param commitHash - The full commit hash to shorten.
 * @param length - The number of characters to take from the start and end of the hash.
 * @returns The shortened commit hash in the format: "start...end"
 */
export function shortenCommitHash(
  commitHash: string,
  length: number = 5
): string {
  if (commitHash.length <= length * 2) {
    return commitHash; // If hash is too short, return as is.
  }

  const start = commitHash.slice(0, length);
  const end = commitHash.slice(-length);

  return `${start}...${end}`;
}
