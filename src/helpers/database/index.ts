import { LocalStorageAdapter } from "./LocalStorageAdapter";
import { TelegramCloudStorageAdapter } from "./TelegramCloudStorageAdapter";
import { UserDataManager } from "./UserDataManager";

export * from "./models";
export * from "./LocalStorageAdapter";
export * from "./UserDataManager";
export * from "./TelegramCloudStorageAdapter";
// import { isCloudStorageSupported } from "@telegram-apps/sdk";

export const userManager = () => {
  const adapters = [new TelegramCloudStorageAdapter()];
  adapters.push(new LocalStorageAdapter());
  return new UserDataManager(adapters);
};
