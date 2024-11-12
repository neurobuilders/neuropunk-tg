export class TelegramCloudStorageAdapter {
  private cloudStorage: any; // Assuming the cloud storage object is provided by the Telegram API

  constructor(cloudStorage: any) {
    this.cloudStorage = cloudStorage;
  }

  // Set an item in the cloud storage
  setItem(key: string, value: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!this.isValidKey(key)) {
        reject(new Error("Invalid key format."));
        return;
      }
      if (value.length > 4096) {
        reject(
          new Error("Value exceeds the maximum length of 4096 characters.")
        );
        return;
      }
      this.cloudStorage.setItem(key, value, (error: any, success: boolean) => {
        if (error) {
          reject(error);
        } else {
          resolve(success);
        }
      });
    });
  }

  // Get an item from the cloud storage
  getItem(key: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      if (!this.isValidKey(key)) {
        reject(new Error("Invalid key format."));
        return;
      }
      this.cloudStorage.getItem(key, (error: any, value: string | null) => {
        if (error) {
          reject(error);
        } else {
          resolve(value);
        }
      });
    });
  }

  // Get multiple items from the cloud storage
  getItems(keys: string[]): Promise<string[]> {
    return new Promise((resolve, reject) => {
      keys.forEach((key) => {
        if (!this.isValidKey(key)) {
          reject(new Error("Invalid key format."));
          return;
        }
      });
      this.cloudStorage.getItems(keys, (error: any, values: string[]) => {
        if (error) {
          reject(error);
        } else {
          resolve(values);
        }
      });
    });
  }

  // Remove an item from the cloud storage
  removeItem(key: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!this.isValidKey(key)) {
        reject(new Error("Invalid key format."));
        return;
      }
      this.cloudStorage.removeItem(key, (error: any, success: boolean) => {
        if (error) {
          reject(error);
        } else {
          resolve(success);
        }
      });
    });
  }

  // Remove multiple items from the cloud storage
  removeItems(keys: string[]): Promise<boolean> {
    return new Promise((resolve, reject) => {
      keys.forEach((key) => {
        if (!this.isValidKey(key)) {
          reject(new Error("Invalid key format."));
          return;
        }
      });
      this.cloudStorage.removeItems(keys, (error: any, success: boolean) => {
        if (error) {
          reject(error);
        } else {
          resolve(success);
        }
      });
    });
  }

  // Get all keys from the cloud storage
  getKeys(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.cloudStorage.getKeys((error: any, keys: string[]) => {
        if (error) {
          reject(error);
        } else {
          resolve(keys);
        }
      });
    });
  }

  // Validate key format
  private isValidKey(key: string): boolean {
    const regex = /^[A-Za-z0-9_-]{1,128}$/;
    return regex.test(key);
  }
}
