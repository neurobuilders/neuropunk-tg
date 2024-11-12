import { User } from "@/helpers/database/models";
import { LocalStorageAdapter } from "@/helpers/database/LocalStorageAdapter";
import { TelegramCloudStorageAdapter } from "@/helpers/database/TelegramCloudStorageAdapter";

export class UserDataManager {
  private storageAdapters: (
    | LocalStorageAdapter
    | TelegramCloudStorageAdapter
  )[];
  private userKey: string;

  constructor(
    storageAdapters: (LocalStorageAdapter | TelegramCloudStorageAdapter)[]
  ) {
    this.storageAdapters = storageAdapters;
    this.userKey = "userData";
  }

  // Save user data to the storage
  async saveUserData(user: User): Promise<void> {
    for (const storage of this.storageAdapters) {
      try {
        if (storage instanceof LocalStorageAdapter) {
          storage.setItem(this.userKey, user);
        } else {
          const success = await storage.setItem(
            this.userKey,
            JSON.stringify(user.toJSON())
          );
          console.log("User data saved successfully:", success);
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
        if (storage instanceof LocalStorageAdapter) {
          return storage.getItem<User>(this.userKey, User);
        } else {
          const value = await storage.getItem(this.userKey);
          return value ? User.fromJSON(JSON.parse(value)) : null;
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
        if (storage instanceof LocalStorageAdapter) {
          storage.removeItem(this.userKey);
        } else {
          const success = await storage.removeItem(this.userKey);
          console.log("User data removed successfully:", success);
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
        if (storage instanceof LocalStorageAdapter) {
          return Object.keys(localStorage);
        } else {
          return await storage.getKeys();
        }
      } catch (error) {
        console.error("Error getting keys:", error);
      }
    }
    return [];
  }
}

export const userManager = new UserDataManager([
  new LocalStorageAdapter(),
  //   new TelegramCloudStorageAdapter(),
]);
