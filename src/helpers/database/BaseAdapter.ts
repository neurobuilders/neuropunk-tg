import { Model } from "@/helpers/database/models";

export abstract class BaseAdapter<T extends Model = Model> {
  constructor() {}

  // Set an item in the storage
  async setItem(key: string, model: T): Promise<boolean> {
    throw new Error("'setItem' method not implemented");
  }

  // Get an item from the storage
  async getItem(key: string): Promise<unknown | null> {
    throw new Error("'getItem' method not implemented");
  }

  // Remove an item from the storage
  protected async removeItem(key: string): Promise<boolean> {
    throw new Error("'removeItem' method not implemented");
  }

  // Remove multiple items from the storage
  protected async removeItems(keys: string[]): Promise<void> {
    throw new Error("'removeItems' method not implemented");
  }

  // Get all keys from the storage
  protected async getKeys(): Promise<string[]> {
    throw new Error("'getKeys' method not implemented");
  }

  // Clear all items from the storage
  protected async clear(): Promise<void> {
    throw new Error("'clear' method not implemented");
  }

  // Validate key format
  protected isValidKey(key: string): boolean {
    throw new Error("'isValidKey' method not implemented");
  }

  /**
   * Converts a given value to its JSON string representation.
   *
   * @protected
   * @template T - The type of the input value. Defaults to `unknown`.
   * @param {T} str - The value to be converted to a JSON string.
   * @returns {string} - The JSON string representation of the input value.
   */
  protected toJSON<T = unknown>(str: T): string {
    return JSON.stringify(str);
  }

  /**
   * Parses a JSON string and returns the corresponding JavaScript value.
   *
   * @protected
   * @template T - The type of the output value. Defaults to `unknown`.
   * @param {string} data - The JSON string to be parsed.
   * @returns {T} - The JavaScript value corresponding to the parsed JSON string.
   */
  protected fromJSON<T = unknown>(data: string): T {
    return JSON.parse(data);
  }

  /**
   * Checks if a feature or functionality is supported.
   *
   * @protected
   * @returns {boolean} - Returns `true` if the feature is supported, otherwise throws an error.
   * @throws {Error} - Throws an error with the message "'isSupported' method not implemented".
   */
  protected isSupported(): Promise<boolean> {
    throw new Error("'isSupported' method not implemented");
  }
}
