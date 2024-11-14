import { LocalStorageAdapter } from "@/helpers/database/LocalStorageAdapter";
import { TelegramCloudStorageAdapter } from "@/helpers/database/TelegramCloudStorageAdapter";
import { captureException } from "@/helpers/utils";
import { LogMethod } from "@/helpers/decorators";
import { ITask, TaskStatus, UserTasks } from "@/helpers/database/models/tasks";

export class UserTasksDataManager<T extends UserTasks = UserTasks> {
  private storageAdapters: (
    | TelegramCloudStorageAdapter<T>
    | LocalStorageAdapter<T>
  )[];
  private dbKey: string;

  constructor(
    storageAdapters: (TelegramCloudStorageAdapter<T> | LocalStorageAdapter<T>)[]
  ) {
    this.storageAdapters = storageAdapters;
    this.dbKey = "userTasks";
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
  async updateTaskStatus(id: string, status: TaskStatus): Promise<boolean> {
    for (const storage of await this.getSupportedAdapters()) {
      try {
        const db = await storage.getItem<Record<string, ITask>>(this.dbKey);
        if (db) {
          db[id] = {
            status,
          };
          const userTasks = new UserTasks(db as any);
          return await storage.setItem(this.dbKey, userTasks.toJSON());
        }
      } catch (err) {
        captureException(err, "Error saving user data");
      }
    }
    return false;
  }

  @LogMethod
  async getTaskStatus(id: string): Promise<ITask> {
    for (const storage of await this.getSupportedAdapters()) {
      try {
        const db = await storage.getItem<Record<string, ITask>>(this.dbKey);
        if (db) {
          return db[id];
        }
      } catch (err) {
        captureException(err, "Error retrieving user task status");
      }
    }
    return {
      status: TaskStatus.Default,
    };
  }

  @LogMethod
  async clearTasks() {
    for (const storage of await this.getSupportedAdapters()) {
      try {
        return await storage.removeItem(this.dbKey);
      } catch (err) {
        captureException(err, "Error removing user tasks data");
      }
    }
    return false;
  }
}
