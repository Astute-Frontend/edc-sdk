import { copyProperties, validate } from "../utils";
import { IModelOption, IParamOption } from "./base";

export function Model(option: string | IModelOption) {
  return function (target: any) {
    // 命名
    if (typeof option == "string") {
      target.prototype.namespace = option;
    }

    // 复杂项
    if (validate.isObject(option)) {
      const { namespace, dbExpires, noDB } = (option as IModelOption);

      target.prototype.namespace = namespace;
      target.prototype.dbExpires = dbExpires;
      target.prototype.noDB = noDB;
    }

    for (let propertyName in target.prototype.paramsDescriptorMap) {
      if (delete target.prototype[propertyName]) {
        // 创建新属性及其读取访问器、写入访问器
        Object.defineProperty(target.prototype, propertyName, target.prototype.paramsDescriptorMap[propertyName]);
      }
    }

    class BaseModel {
      constructor() {
        // 拷贝所有的实例方法
        copyProperties(this, target.prototype);
      }
    }

    // 拷贝所有的静态属性
    copyProperties(BaseModel, target.prototype.constructor);
    // 拷贝原型属性
    copyProperties(BaseModel.prototype, target.prototype.constructor.prototype);

    return (BaseModel as any);
  }
}

export function Param<T>(option: string | IParamOption<T>) {
  return function (target: any, propertyName: string) {
    console.log("Param", target, target[propertyName], target.prototype);

    if (!target.paramsDescriptorMap) {
      target.paramsDescriptorMap = {}
    }

    const paramOption: IParamOption<T> = {
      namespace: typeof option == "string" ? option : option.namespace
    };

    if (validate.isObject(option)) {
      (option as IParamOption<T>).default && (paramOption.default = (option as IParamOption<T>).default);
      (option as IParamOption<T>).validate && (paramOption.validate = (option as IParamOption<T>).validate);
      (option as IParamOption<T>).descriptor && (paramOption.descriptor = (option as IParamOption<T>).descriptor);
      (option as IParamOption<T>).set && (paramOption.set = (option as IParamOption<T>).set);
      (option as IParamOption<T>).get && (paramOption.get = (option as IParamOption<T>).get);
      (option as IParamOption<T>).noDB && (paramOption.noDB = (option as IParamOption<T>).noDB);
    }

    target[propertyName] = paramOption.default || undefined;

    // 设置参数的访问器
    if (paramOption.descriptor) {
      target.paramsDescriptorMap[propertyName] = paramOption.descriptor;
    } else {
      // 属性读取访问器
      const getter = () => {
        let dbData;
        if (paramOption.noDB) {
          dbData = target.__dbData;
        } else {
          dbData = target.read();
        }
        

        console.log(`Get: ${propertyName} => ${(dbData && dbData[paramOption.namespace]) || paramOption.default}`);

        let result = (dbData && dbData[paramOption.namespace]) || paramOption.default || undefined;

        if (paramOption.get) {
          result = paramOption.get(result);
        }

        return result;
      };

      // 属性写入访问器
      const setter = async (newVal: T) => {
        console.log(`Set: ${propertyName} => ${newVal}`);

        // 如果配置了验证规则，这里要做验证
        if (paramOption.validate) {
          try {
            await paramOption.validate(newVal);
          } catch (error) {
            throw error;
          }
        }

        if (paramOption.set) {
          paramOption.set(newVal);
        }

        if (paramOption.noDB) {
          const dbData = target.__dbData || {};

          dbData[paramOption.namespace] = newVal;
          target.__dbData = dbData;
        } else {
          const dbData = target.read() || {};

          dbData[paramOption.namespace] = newVal;
          target.save(dbData);
        }
      };

      target.paramsDescriptorMap[propertyName] = {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
      };
    }
  }
}