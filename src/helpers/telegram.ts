import {
  hapticFeedback,
  ImpactHapticFeedbackStyle,
  isTMA,
} from "@telegram-apps/sdk-react";

import { captureException, getUrl } from "@/helpers/utils";
import env from "@/env";

export const triggerHapticFeedback = (
  style: ImpactHapticFeedbackStyle = "heavy"
) => {
  try {
    hapticFeedback.impactOccurred(style);
  } catch (err) {
    captureException(err);
  }
};

export const getBotUrl = (startappArg?: string) => {
  const url = getUrl(`https://t.me/${env.telegram.botUsername}`, false);
  if (startappArg) {
    url.searchParams.append("startapp", startappArg);
  }
  return url.toString();
};

export const isTelegramMiniApp = () => {
  return !sessionStorage.getItem("env-mocked") && isTMA("simple");
};
