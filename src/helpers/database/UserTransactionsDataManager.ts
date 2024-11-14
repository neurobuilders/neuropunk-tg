import { Transaction, UserTransactions } from "@/helpers/database/models";
import { LocalStorageAdapter } from "@/helpers/database/LocalStorageAdapter";
import { TelegramCloudStorageAdapter } from "@/helpers/database/TelegramCloudStorageAdapter";
import { captureException } from "@/helpers/utils";
import { LogMethod } from "@/helpers/decorators";

export class UserTransactionsDataManager<
  T extends UserTransactions = UserTransactions
> {
  private storageAdapters: (
    | TelegramCloudStorageAdapter<T>
    | LocalStorageAdapter<T>
  )[];
  private dbKey: string;

  constructor(
    storageAdapters: (TelegramCloudStorageAdapter<T> | LocalStorageAdapter<T>)[]
  ) {
    this.storageAdapters = storageAdapters;
    this.dbKey = "userTransactions";
  }

  @LogMethod
  async getSupportedAdapters(): Promise<typeof this.storageAdapters> {
    const adapters = [];
    for (const adapter of await this.storageAdapters) {
      const isSupported = await adapter.isSupported();
      if (isSupported) {
        adapters.push(adapter);
      }
    }
    return adapters;
  }

  @LogMethod
  async addTransaction(transaction: Transaction): Promise<boolean> {
    for (const storage of await this.getSupportedAdapters()) {
      try {
        const transactionsModel = await this.getTransactions();
        const transactions = transactionsModel.toJSON();

        const newTransactions = [...transactions, transaction.toJSON()];
        const newTransactionsModel = UserTransactions.fromJSON(newTransactions);

        return await storage.setItem(this.dbKey, newTransactionsModel as T);
      } catch (err) {
        captureException(err, "Error saving user data");
      }
    }
    return false;
  }

  @LogMethod
  async getTransactions(): Promise<UserTransactions> {
    for (const storage of await this.getSupportedAdapters()) {
      try {
        const data = await storage.getItem(this.dbKey);
        return new UserTransactions((data as any[]) || []);
      } catch (err) {
        captureException(err, "Error retrieving user data");
      }
    }
    return new UserTransactions([]);
  }

  @LogMethod
  async clearTransactions() {
    for (const storage of await this.getSupportedAdapters()) {
      try {
        return await storage.removeItem(this.dbKey);
      } catch (err) {
        captureException(err, "Error removing user data");
      }
    }
    return false;
  }
}
