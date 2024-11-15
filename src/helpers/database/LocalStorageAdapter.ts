import { Model } from "@/helpers/database/models/Model";
import { BaseAdapter } from "@/helpers/database/BaseAdapter";
import { captureException, isStorageAvailable } from "@/helpers/utils";
import { LogMethod } from "@/helpers/decorators";

export class LocalStorageAdapter<
  T extends Model = Model
> extends BaseAdapter<T> {
  private isEnabled = true;

  constructor() {
    super();

    try {
      if (!isStorageAvailable()) {
        throw new Error("LocalStorage is not supported in this browser.");
      }
    } catch (err) {
      captureException(err);
      this.isEnabled = false;
    }
  }

  @LogMethod
  async getKeys(): Promise<string[]> {
    if (!globalThis.localStorage) {
      return [];
    }
    return Object.keys(globalThis.localStorage);
  }

  // Set an item in localStorage
  @LogMethod
  async setItem(key: string, model: T): Promise<boolean> {
    try {
      localStorage.setItem(key, JSON.stringify(model.toJSON()));
      return true;
    } catch (err) {
      captureException(err, "Error setting localStorage item");
    }
    return false;
  }

  // Get an item from localStorage
  @LogMethod
  async getItem<T>(key: string): Promise<T | null> {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (err) {
      captureException(err, "Error getting localStorage item");
    }
    return null;
  }

  // Remove an item from localStorage
  @LogMethod
  async removeItem(key: string): Promise<boolean> {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (err) {
      captureException(err, "Error removing localStorage item");
    }
    return false;
  }

  // Clear all items from localStorage
  @LogMethod
  async clear(): Promise<void> {
    try {
      localStorage.clear();
    } catch (err) {
      captureException(err, "Error clearing localStorage");
    }
  }

  @LogMethod
  isValidKey(key: string): boolean {
    // @todo
    return true;
  }

  @LogMethod
  async isSupported(): Promise<boolean> {
    return this.isEnabled;
  }
}
