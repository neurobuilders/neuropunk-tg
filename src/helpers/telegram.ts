import {
  hapticFeedback,
  ImpactHapticFeedbackStyle,
} from "@telegram-apps/sdk-react";
import * as Sentry from "@sentry/nextjs";

export const triggerHapticFeedback = (
  style: ImpactHapticFeedbackStyle = "heavy"
) => {
  try {
    hapticFeedback.impactOccurred(style);
  } catch (err) {
    Sentry.captureException(err);
  }
};
