import { Model } from "@/helpers/database/models";

export abstract class BaseAdapter<T extends Model = Model> {
  constructor() {}

  // Set an item in the storage
  async setItem(key: string, value: any): Promise<void> {
    throw new Error("'setItem' method not implemented");
  }

  // Get an item from the storage
  async getItem(key: string): Promise<T | null> {
    throw new Error("'getItem' method not implemented");
  }

  // Remove an item from the storage
  async removeItem(key: string): Promise<boolean> {
    throw new Error("'removeItem' method not implemented");
  }

  // Remove multiple items from the storage
  async removeItems(keys: string[]): Promise<void> {
    throw new Error("'removeItems' method not implemented");
  }

  // Get all keys from the storage
  async getKeys(): Promise<string[]> {
    throw new Error("'getKeys' method not implemented");
  }

  // Clear all items from the storage
  async clear(): Promise<void> {
    throw new Error("'clear' method not implemented");
  }

  // Validate key format
  public isValidKey(key: string): boolean {
    throw new Error("'isValidKey' method not implemented");
  }

  public toJSON(str: string): any {
    throw new Error("'fromJSON' method not implemented");
  }

  public fromJSON(data: any): any {
    throw new Error("'fromJSON' method not implemented");
  }

  public isSupported(): boolean {
    throw new Error("'isSupported' method not implemented");
  }
}
