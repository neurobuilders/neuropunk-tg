import { User } from "@/helpers/database/models";
import { LocalStorageAdapter } from "@/helpers/database/LocalStorageAdapter";

export class UserDataManager {
  private storage: LocalStorageAdapter;
  private userKey: string;

  constructor() {
    this.storage = new LocalStorageAdapter();
    this.userKey = "userData";
  }

  // Save user data to localStorage
  saveUserData(user: User): void {
    this.storage.setItem(this.userKey, user);
  }

  // Retrieve user data from localStorage
  getUserData(): User | null {
    return this.storage.getItem(this.userKey, User) as User;
  }

  // Remove user data from localStorage
  clearUserData(): void {
    this.storage.removeItem(this.userKey);
  }
}

export const userManager = new UserDataManager();
