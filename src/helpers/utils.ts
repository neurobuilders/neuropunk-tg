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
