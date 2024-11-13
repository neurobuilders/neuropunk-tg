import {
  deleteCloudStorageItem,
  getCloudStorageItem,
  getCloudStorageKeys,
  setCloudStorageItem,
  isCloudStorageSupported,
} from "@telegram-apps/sdk-react";
import { Model, User } from "@/helpers/database/models";
import { BaseAdapter } from "@/helpers/database/BaseAdapter";
import { captureException } from "../utils";

export class TelegramCloudStorageAdapter<
  T extends Model = User
> extends BaseAdapter<T> {
  constructor() {
    super();
  }

  // Set an item in the cloud storage
  async setItem(key: string, model: T): Promise<boolean> {
    if (!this.isValidKey(key)) {
      throw new Error("Invalid key format.");
    }
    const valueJson = this.toJSON(model.toJSON());
    if (valueJson.length > 4096) {
      throw new Error("Value exceeds the maximum length of 4096 characters.");
    }
    try {
      await setCloudStorageItem(key, valueJson);
      return true;
    } catch (err) {
      captureException(err, "Error setting TelegramCloudStorage item");
    }
    return false;
  }

  // Get an item from the cloud storage
  async getItem(key: string): Promise<unknown | null> {
    if (!this.isValidKey(key)) {
      throw new Error("Invalid key format.");
    }
    try {
      const str = await getCloudStorageItem(key);
      return this.fromJSON(str);
    } catch (err) {
      captureException(err, "Error getting TelegramCloudStorage item");
    }
    return null;
  }

  // Remove an item from the cloud storage
  async removeItem(key: string): Promise<boolean> {
    if (!this.isValidKey(key)) {
      throw new Error("Invalid key format.");
    }
    try {
      await deleteCloudStorageItem(key);
      return true;
    } catch (err) {
      captureException(err, "Error removing TelegramCloudStorage item");
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
  isValidKey(key: string): boolean {
    const regex = /^[A-Za-z0-9_-]{1,128}$/;
    return regex.test(key);
  }

  isSupported(): boolean {
    return isCloudStorageSupported();
  }
}
