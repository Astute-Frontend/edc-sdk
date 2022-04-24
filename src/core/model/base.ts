import { storage } from "../utils";

/**
 * 数据模型配置项
 * @param {string} namespace 名称，用来区分db
 * @param {number} dbExpires 数据过期时间
 */
export interface IModelOption {
  namespace?: string;
  dbExpires?: number;
  noDB?: boolean;
}

export interface IParamOption<T> {
  namespace: string;
  default?: T;
  descriptor?: PropertyDescriptor
  set?: (value: T) => void;
  get?: (dbValue: T) => T;
  validate?: (value: T) => Promise<unknown>;
  noDB?: boolean;
}

export default class BaseModel<T> {
  namespace?: string;

  dbExpires?: number;

  noDB?: boolean;

  paramsDescriptorMap?: { [paramName: string]: Array<PropertyDescriptor> }

  __dbData?: T;

  save?(saveDate: T) {
    if (this.namespace) {
      if (this.noDB) {
        this.__dbData = saveDate;
      } else {
        storage.set(this.namespace, saveDate, this.dbExpires);
      }
    } else {
      throw new Error("no namespace");
    }
  }

  read?() {
    console.log("read", this);
    if (this.namespace) {
      if (this.noDB) {
        return this.__dbData;
      } else {
        return storage.get(this.namespace) as T;
      }
    } else {
      throw new Error("no namespace");
    }
  }

  clean?() {
    if (this.namespace) {
      if (this.noDB) {
        console.log("Unable to empty nodb object");
      } else {
        storage.remove(this.namespace);
      }
    } else {
      throw new Error("no namespace");
    }
  }
}