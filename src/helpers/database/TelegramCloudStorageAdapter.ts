import {
  deleteCloudStorageItem,
  getCloudStorageItem,
  getCloudStorageKeys,
  setCloudStorageItem,
  isCloudStorageSupported,
} from "@telegram-apps/sdk-react";
import { User } from "@/helpers/database/models";
import { BaseAdapter } from "@/helpers/database/BaseAdapter";

export class TelegramCloudStorageAdapter<
  T extends User = User
> extends BaseAdapter<T> {
  constructor() {
    super();
  }

  // Set an item in the cloud storage
  async setItem(key: string, value: any): Promise<void> {
    if (!this.isValidKey(key)) {
      throw new Error("Invalid key format.");
    }
    const valueJson = this.fromJSON(value);
    if (valueJson.length > 4096) {
      throw new Error("Value exceeds the maximum length of 4096 characters.");
    }
    return await setCloudStorageItem(key, valueJson);
  }

  // Get an item from the cloud storage
  async getItem(key: string): Promise<T | null> {
    if (!this.isValidKey(key)) {
      throw new Error("Invalid key format.");
    }
    const str = await getCloudStorageItem(key);
    return this.toJSON(str);
  }

  // Get multiple items from the cloud storage
  //   async getItems(keys: string[]): Promise<Record<string, string>> {
  //     keys.forEach((key) => {
  //       if (!this.isValidKey(key)) {
  //         throw new Error("Invalid key format.");
  //       }
  //     });
  //     return await getCloudStorageItem(keys);
  //   }

  // Remove an item from the cloud storage
  async removeItem(key: string): Promise<boolean> {
    if (!this.isValidKey(key)) {
      throw new Error("Invalid key format.");
    }
    try {
      await deleteCloudStorageItem(key);
      return true;
    } catch (err) {
      console.error("Error removing TelegramCloudStorage item:", err);
    }
    return false;
  }

  // Remove multiple items from the cloud storage
  async removeItems(keys: string[]): Promise<void> {
    keys.forEach((key) => {
      if (!this.isValidKey(key)) {
        throw new Error("Invalid key format.");
      }
    });
    deleteCloudStorageItem(keys);
  }

  // Get all keys from the cloud storage
  async getKeys(): Promise<string[]> {
    return await getCloudStorageKeys();
  }

  // Clear all items from localStorage
  async clear(): Promise<void> {
    const keys = await this.getKeys();
    await this.removeItems(keys);
  }

  // Validate key format
  public isValidKey(key: string): boolean {
    const regex = /^[A-Za-z0-9_-]{1,128}$/;
    return regex.test(key);
  }

  public toJSON(str: string): any {
    return JSON.stringify(str);
  }

  public fromJSON(data: any): any {
    return JSON.parse(data);
  }

  public isSupported(): boolean {
    return isCloudStorageSupported();
  }
}
