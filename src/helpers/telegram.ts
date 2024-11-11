import {
  hapticFeedback,
  ImpactHapticFeedbackStyle,
} from "@telegram-apps/sdk-react";

import { captureException } from "@/helpers/utils";

export const triggerHapticFeedback = (
  style: ImpactHapticFeedbackStyle = "heavy"
) => {
  try {
    hapticFeedback.impactOccurred(style);
  } catch (err) {
    captureException(err);
  }
};
