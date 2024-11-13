import { User } from "@/helpers/database/models";
import { LocalStorageAdapter } from "@/helpers/database/LocalStorageAdapter";
import { TelegramCloudStorageAdapter } from "@/helpers/database/TelegramCloudStorageAdapter";
import { captureException } from "../utils";

export class UserDataManager<T extends User = User> {
  private storageAdapters: (
    | TelegramCloudStorageAdapter<T>
    | LocalStorageAdapter<T>
  )[];
  private userKey: string;

  constructor(
    storageAdapters: (TelegramCloudStorageAdapter<T> | LocalStorageAdapter<T>)[]
  ) {
    this.storageAdapters = storageAdapters;
    this.userKey = "userData";
  }

  getSupportedAdapters(): typeof this.storageAdapters {
    return this.storageAdapters.filter((adapter) => adapter.isSupported());
  }

  // Save user data to the storage
  async saveUserData(user: T): Promise<boolean> {
    for (const storage of this.getSupportedAdapters()) {
      try {
        return await storage.setItem(this.userKey, user);
      } catch (err) {
        captureException(err, "Error saving user data");
      }
    }
    return false;
  }

  // Retrieve user data from the storage
  async getUserData() {
    for (const storage of this.getSupportedAdapters()) {
      try {
        return await storage.getItem(this.userKey);
      } catch (err) {
        captureException(err, "Error retrieving user data");
      }
    }
    return null;
  }

  // Remove user data from the storage
  async clearUserData() {
    for (const storage of this.getSupportedAdapters()) {
      try {
        return await storage.removeItem(this.userKey);
      } catch (err) {
        captureException(err, "Error removing user data");
      }
    }
    return false;
  }

  // Get all keys from the storage
  async getAllKeys() {
    for (const storage of this.getSupportedAdapters()) {
      try {
        return await storage.getKeys();
      } catch (err) {
        captureException(err, "Error getting keys");
      }
    }
    return [];
  }
}
