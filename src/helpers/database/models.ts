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

export const getDefaultUser = (userId: number) => {
  return new User({
    id: userId,
    energyAmount: 0,
  });
};
