import { Model } from "@/helpers/database/models/Model";
import { uniqueId } from "lodash";

export interface ITransaction {
  id?: string;
  amount: number;
}

export class Transaction extends Model implements ITransaction {
  constructor(data: ITransaction) {
    super(data);
    this.id = uniqueId("transaction");
  }

  get id(): string {
    return this.data.id;
  }

  private set id(value: string) {
    this.data.id = value;
  }

  get amount(): number {
    return this.data.amount;
  }

  set amount(value: number) {
    this.data.amount = value;
  }
}

export interface ITransactions {
  transactions: ITransaction[];
}

export class UserTransactions extends Model implements ITransactions {
  constructor(data: ITransaction[]) {
    super(data);
  }

  get transactions(): ITransaction[] {
    return this.data.transactions;
  }

  set transactions(transactions: ITransaction[]) {
    this.data.transactions = transactions;
  }
}
