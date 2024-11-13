import { LocalStorageAdapter } from "./LocalStorageAdapter";
import { TelegramCloudStorageAdapter } from "./TelegramCloudStorageAdapter";
import { UserDataManager } from "./UserDataManager";

export * from "./models";
export * from "./LocalStorageAdapter";
export * from "./UserDataManager";
export * from "./TelegramCloudStorageAdapter";

export const getUserManager = () => {
  return new UserDataManager([
    new TelegramCloudStorageAdapter(),
    new LocalStorageAdapter(),
  ]);
};
