import { Model } from "@/helpers/database/models/Model";

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
