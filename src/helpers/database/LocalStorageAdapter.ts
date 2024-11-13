import { IModel, User } from "@/helpers/database/models";
import { BaseAdapter } from "@/helpers/database/BaseAdapter";
import { captureException, isStorageAvailable } from "@/helpers/utils";

export class LocalStorageAdapter<T extends User = User> extends BaseAdapter<T> {
  isEnabled = true;
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
    return await Object.keys(globalThis.localStorage);
  }

  // Set an item in localStorage
  async setItem<T extends IModel>(key: string, model: T): Promise<void> {
    try {
      localStorage.setItem(key, JSON.stringify(model.toJSON()));
    } catch (error) {
      console.error("Error setting localStorage item:", error);
    }
  }

  // Get an item from localStorage
  async getItem<T>(key: string): Promise<T | null> {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error("Error getting localStorage item:", error);
      return null;
    }
  }

  // Remove an item from localStorage
  async removeItem(key: string): Promise<boolean> {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error("Error removing localStorage item:", error);
    }
    return false;
  }

  // Clear all items from localStorage
  async clear(): Promise<void> {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  }

  public isValidKey(key: string): boolean {
    // @todo
    return true;
  }

  public isSupported(): boolean {
    return this.isEnabled;
  }
}
