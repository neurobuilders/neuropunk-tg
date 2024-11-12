import { IModel, Model } from "@/helpers/database/models";
import { BaseAdapter } from "@/helpers/database/BaseAdapter";

export class LocalStorageAdapter<
  T extends Model = Model
> extends BaseAdapter<T> {
  constructor() {
    super();
    if (!globalThis.localStorage) {
      throw new Error("LocalStorage is not supported in this browser.");
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
  async removeItem(key: string): Promise<void> {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing localStorage item:", error);
    }
  }

  // Clear all items from localStorage
  async clear(): Promise<void> {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  }

  protected isValidKey(key: string): boolean {
    // @todo
    return true;
  }
}
