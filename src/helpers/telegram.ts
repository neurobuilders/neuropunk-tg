import {
  hapticFeedback,
  ImpactHapticFeedbackStyle,
} from "@telegram-apps/sdk-react";

export const triggerHapticFeedback = (
  style: ImpactHapticFeedbackStyle = "heavy"
) => {
  try {
    hapticFeedback.impactOccurred(style);
  } catch (err) {
    console.error(err);
  }
};
