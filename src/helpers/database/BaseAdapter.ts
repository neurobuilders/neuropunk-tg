import { IModel, IModelConstructor, Model } from "@/helpers/database/models";

export abstract class BaseAdapter<T extends Model = Model> {
  constructor() {}

  // Set an item in the cloud storage
  async setItem(key: string, value: any): Promise<void> {}

  // Get an item from the cloud storage
  // Get an item from localStorage
  async getItem(key: string): Promise<T | null> {
    throw new Error("'getItem' method not implemented");
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
  async removeItem(key: string): Promise<void> {}

  // Remove multiple items from the cloud storage
  async removeItems(keys: string[]): Promise<void> {}

  // Get all keys from the cloud storage
  async getKeys(): Promise<string[]> {
    throw new Error("'getKeys' method not implemented");
  }

  // Clear all items from localStorage
  async clear(): Promise<void> {}

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
}
