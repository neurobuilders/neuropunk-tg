import {
  hapticFeedback,
  ImpactHapticFeedbackStyle,
} from "@telegram-apps/sdk-react";
import {
  getCloudStorageItem,
  setCloudStorageItem,
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

const databasePrefix = "neuropunk_v1";

export const TelegramCloudStorage = {
  // Method to set an item in cloud storage
  put: (key: string, value: any) => {
    return setCloudStorageItem(key, JSON.stringify(value));
  },

  // // Method to get an item from cloud storage
  get: async (key: string) => {
    const json = await getCloudStorageItem(key);
    if (!json) return null;
    return JSON.parse(json);
  },

  // // Method to get multiple items by their keys
  // //   getItems(keys: string[]) {
  // //     return new Promise((resolve, reject) => {
  // //       this.storage.getItem(keys, (error, values) => {
  // //         if (error) {
  // //           reject(error);
  // //         } else {
  // //           resolve(values);
  // //         }
  // //       });
  // //     });
  // //   }

  // // Method to remove an item from cloud storage
  // remove(key: string) {
  //   return deleteCloudStorageItem(key);
  // }

  // //   // Method to remove multiple items by their keys
  // //   removeItems(keys) {
  // //     return new Promise((resolve, reject) => {
  // //       this.storage.removeItems(keys, (error, success) => {
  // //         if (error) {
  // //           reject(error);
  // //         } else {
  // //           resolve(success);
  // //         }
  // //       });
  // //     });
  // //   }

  // // Method to get all keys in cloud storage
  // getKeys: () => {
  //   return getCloudStorageKeys();
  // },
};
