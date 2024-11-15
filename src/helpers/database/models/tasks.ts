import { Model } from "@/helpers/database/models/Model";

export enum TaskStatus {
  Default = "default",
  Completed = "completed",
  Loading = "loading",
}

export interface ITasks {
  tasks: Record<string, ITask>;
}

export interface ITask {
  status: TaskStatus;
}

export class UserTasks extends Model implements ITasks {
  constructor(data: Record<string, ITask>) {
    super(data);
  }

  get tasks(): Record<string, ITask> {
    return this.data;
  }

  set transactions(tasks: Record<string, ITask>) {
    this.data = tasks;
  }
}
