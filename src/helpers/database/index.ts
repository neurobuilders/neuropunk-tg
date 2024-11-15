import { LocalStorageAdapter } from "@/helpers/database/LocalStorageAdapter";
import { TelegramCloudStorageAdapter } from "@/helpers/database/TelegramCloudStorageAdapter";
import { UserDataManager } from "@/helpers/database/UserDataManager";
import { UserTransactionsDataManager } from "@/helpers/database/UserTransactionsDataManager";
import { UserTasksDataManager } from "@/helpers/database/UserTasksDataManager";

export * from "@/helpers/database/models";
export * from "@/helpers/database/LocalStorageAdapter";
export * from "@/helpers/database/UserDataManager";
export * from "@/helpers/database/TelegramCloudStorageAdapter";

export const getUserManager = () => {
  return new UserDataManager([
    new TelegramCloudStorageAdapter(),
    new LocalStorageAdapter(),
  ]);
};

export const getUserTransactionsManager = () => {
  return new UserTransactionsDataManager([
    new TelegramCloudStorageAdapter(),
    new LocalStorageAdapter(),
  ]);
};

export const getUserTasksManager = () => {
  return new UserTasksDataManager([
    new TelegramCloudStorageAdapter(),
    new LocalStorageAdapter(),
  ]);
};
