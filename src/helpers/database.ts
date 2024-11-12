"use client";

export interface IModel {
  toJSON(): any;
}

export interface IModelConstructor<T extends Model> {
  new (data: any): T;
  fromJSON(json: any): T;
}

export class Model implements IModel {
  protected data: any;

  constructor(data: any = {}) {
    this.data = data;
  }

  toJSON(): any {
    return this.data;
  }

  static fromJSON<T extends Model>(this: new (data: any) => T, json: any): T {
    return new this(json);
  }
}

export interface IUser {
  id: number;
  energyAmount: number;
}

export class User extends Model implements IUser {
  constructor(data: IUser) {
    super(data);
  }

  get id(): number {
    return this.data.id;
  }

  set id(value: number) {
    this.data.id = value;
  }

  get energyAmount(): number {
    return this.data.energyAmount;
  }

  set energyAmount(value: number) {
    this.data.energyAmount = value;
  }
}

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
