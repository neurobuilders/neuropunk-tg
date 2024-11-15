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
