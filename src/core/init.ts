import {
  telegramBackgroundColor,
  telegramBottomBarColor,
  telegramHeaderColor,
} from "@/helpers/constants";
import { triggerHapticFeedback } from "@/helpers/telegram";
import { captureException } from "@/helpers/utils";
import {
  backButton,
  viewport,
  themeParams,
  miniApp,
  initData,
  $debug,
  init as initSDK,
  swipeBehavior,
  mainButton,
} from "@telegram-apps/sdk-react";

/**
 * Initializes the application and configures its dependencies.
 */
export async function init(debug: boolean): Promise<void> {
  // Set @telegram-apps/sdk-react debug mode.
  $debug.set(debug);

  // Initialize special event handlers for Telegram Desktop, Android, iOS, etc.
  // Also, configure the package.
  initSDK();

  // Mount all components used in the project.
  if (backButton.isSupported()) {
    backButton.mount();
    backButton.onClick(() => {
      triggerHapticFeedback();
    });
  }

  // Define components-related CSS variables.
  if (!themeParams.isMounted()) {
    themeParams.mount();
    themeParams.bindCssVars();
  }

  if (!miniApp.isMounted()) {
    miniApp.mount();
    miniApp.bindCssVars();

    miniApp.setBackgroundColor(telegramBackgroundColor);
    miniApp.setBottomBarColor(telegramBottomBarColor);
    miniApp.setHeaderColor(telegramHeaderColor);
  }

  initData.restore();

  if (!viewport.isMounted() && !viewport.isMounting()) {
    try {
      await viewport.mount();
    } catch (err) {
      captureException(err);
    }
  }

  if (viewport.isMounted()) {
    if (!viewport.isCssVarsBound()) {
      viewport.bindCssVars();
    }

    // Expand the TMA if it was launched in compact mode
    if (!viewport.isExpanded()) {
      viewport.expand();
    }
  }

  if (!swipeBehavior.isMounted()) {
    swipeBehavior.mount();
  }

  // Disable vertical swipe behavior for TMA (if it wasn't yet), so that it can't be closed or minimized
  if (swipeBehavior.isVerticalEnabled()) {
    swipeBehavior.disableVertical();
  }
}
