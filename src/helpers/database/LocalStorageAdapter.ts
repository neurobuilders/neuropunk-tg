import { IModel, IModelConstructor, Model } from "@/helpers/database/models";

export class LocalStorageAdapter {
  constructor() {
    if (!globalThis.localStorage) {
      throw new Error("LocalStorage is not supported in this browser.");
    }
  }

  // Set an item in localStorage
  setItem<T extends IModel>(key: string, model: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(model.toJSON()));
    } catch (error) {
      console.error("Error setting localStorage item:", error);
    }
  }

  // Get an item from localStorage
  getItem<T extends Model>(
    key: string,
    ModelClass: IModelConstructor<T>
  ): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? ModelClass.fromJSON(JSON.parse(item)) : null;
    } catch (error) {
      console.error("Error getting localStorage item:", error);
      return null;
    }
  }

  // Remove an item from localStorage
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing localStorage item:", error);
    }
  }

  // Clear all items from localStorage
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  }
}
