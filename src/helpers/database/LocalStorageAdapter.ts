import { Model, User } from "@/helpers/database/models";
import { BaseAdapter } from "@/helpers/database/BaseAdapter";
import { captureException, isStorageAvailable } from "@/helpers/utils";

export class LocalStorageAdapter<
  T extends Model = User
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

  async getKeys(): Promise<string[]> {
    if (!globalThis.localStorage) {
      return [];
    }
    return Object.keys(globalThis.localStorage);
  }

  // Set an item in localStorage
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
  async getItem(key: string): Promise<unknown | null> {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (err) {
      captureException(err, "Error getting localStorage item");
    }
    return null;
  }

  // Remove an item from localStorage
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
  async clear(): Promise<void> {
    try {
      localStorage.clear();
    } catch (err) {
      captureException(err, "Error clearing localStorage");
    }
  }

  isValidKey(key: string): boolean {
    // @todo
    return true;
  }

  isSupported(): boolean {
    return this.isEnabled;
  }
}
