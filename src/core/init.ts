import {
  backButton,
  viewport,
  themeParams,
  miniApp,
  initData,
  $debug,
  init as initSDK,
} from "@telegram-apps/sdk-react";
import * as Sentry from "@sentry/nextjs";

/**
 * Initializes the application and configures its dependencies.
 */
export function init(debug: boolean): void {
  // Set @telegram-apps/sdk-react debug mode.
  $debug.set(debug);

  // Initialize special event handlers for Telegram Desktop, Android, iOS, etc.
  // Also, configure the package.
  initSDK();

  // Mount all components used in the project.
  if (backButton.isSupported()) {
    backButton.mount();
  }

  // Define components-related CSS variables.
  if (!themeParams.isMounted()) {
    themeParams.mount();
    themeParams.bindCssVars();
  }

  if (!miniApp.isMounted()) {
    miniApp.mount();
    miniApp.bindCssVars();
  }

  initData.restore();

  if (!viewport.isMounted() && !viewport.isMounting()) {
    void viewport.mount().catch((err) => {
      console.error("Something went wrong mounting the viewport", err);
      Sentry.captureException(err);
    });
  }

  if (viewport.isMounted()) {
    viewport.bindCssVars();
  }
}
