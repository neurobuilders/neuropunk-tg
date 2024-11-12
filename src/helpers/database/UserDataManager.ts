import { User } from "@/helpers/database/models";
import { LocalStorageAdapter } from "@/helpers/database/LocalStorageAdapter";
import { TelegramCloudStorageAdapter } from "@/helpers/database/TelegramCloudStorageAdapter";

export class UserDataManager<T extends User = User> {
  private storageAdapters: (
    | TelegramCloudStorageAdapter
    | LocalStorageAdapter
  )[];
  private userKey: string;

  constructor(
    storageAdapters: (TelegramCloudStorageAdapter<T> | LocalStorageAdapter<T>)[]
  ) {
    this.storageAdapters = storageAdapters;
    this.userKey = "userData";
  }

  // Save user data to the storage
  async saveUserData(user: T): Promise<void> {
    for (const storage of this.storageAdapters) {
      try {
        if (storage instanceof TelegramCloudStorageAdapter) {
          const success = await storage.setItem(
            this.userKey,
            JSON.stringify(user.toJSON())
          );
          console.log("User data saved successfully:", success);
        } else {
          storage.setItem(this.userKey, user);
        }
      } catch (error) {
        console.error("Error saving user data:", error);
      }
    }
  }

  // Retrieve user data from the storage
  async getUserData(): Promise<User | null> {
    for (const storage of this.storageAdapters) {
      try {
        if (storage instanceof TelegramCloudStorageAdapter) {
          const value = await storage.getItem(this.userKey);
          return value ? User.fromJSON(JSON.parse(value as any)) : null;
        } else {
          return storage.getItem<User>(this.userKey);
        }
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    }
    return null;
  }

  // Remove user data from the storage
  async clearUserData(): Promise<void> {
    for (const storage of this.storageAdapters) {
      try {
        if (storage instanceof TelegramCloudStorageAdapter) {
          const success = await storage.removeItem(this.userKey);
          console.log("User data removed successfully:", success);
        } else {
          storage.removeItem(this.userKey);
        }
      } catch (error) {
        console.error("Error removing user data:", error);
      }
    }
  }

  // Get all keys from the storage
  async getAllKeys(): Promise<string[]> {
    for (const storage of this.storageAdapters) {
      try {
        if (storage instanceof TelegramCloudStorageAdapter) {
          return await storage.getKeys();
        } else {
          return Object.keys(localStorage);
        }
      } catch (error) {
        console.error("Error getting keys:", error);
      }
    }
    return [];
  }
}
