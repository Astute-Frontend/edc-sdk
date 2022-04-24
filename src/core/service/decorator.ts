import { AxiosRequestConfig } from "axios";
import { spawn } from "child_process";
import { createConnection, NetConnectOpts } from "net";
import { deepMerge, validate } from "../utils";
import request from "../utils/request";
import { IApiOption, ICMDOption, IHTTPOption, IServiceOption } from "./base";

export function Service(option: string | IServiceOption) {
  return function (target: { prototype: IServiceOption; }) {
    // 命名
    if (typeof option == "string") {
      target.prototype.namespace = option;
    }

    // 复杂项
    if (validate.isObject(option)) {
      const { namespace, apiMap } = (option as IServiceOption);

      target.prototype.namespace = namespace;
      target.prototype.apiMap = apiMap;
    }
  }
}

export function Api(_option: string | IApiOption) {
  return function (target: IServiceOption, key: string, descriptor: PropertyDescriptor) {
    if (!target.apiMap) {
      target.apiMap = {};
    }

    // 命名
    if (typeof _option == "string") {
      target.apiMap[key] = {
        namespace: _option
      };
    }

    // 复杂项
    if (validate.isObject(_option)) {
      const { namespace, type, option, requestParamIndex, responseParamIndex } = (_option as IApiOption);

      target.apiMap[key] = {
        namespace,
        type,
        option,
        requestParamIndex,
        responseParamIndex
      };

      const apiFunction = descriptor.value;
      descriptor.value = async (...args: Array<any>) => {
        console.log("descriptor arguments", args);
        if (!args[requestParamIndex || 0]) args[requestParamIndex || 0] = {};
        if (!args[responseParamIndex || 1]) args[responseParamIndex || 1] = {};

        const before = target.apiMap[key].before;
        if (before) {
          args[requestParamIndex || 0] = await before(args[requestParamIndex || 0]);
        }

        // if (!validate.isObject(args[requestParamIndex || 0])) {
        //   throw new Error("request param 必须是对象类型，request param 可以通过 requestParamIndex 参数指定，也可以通过 ApiRequest 装饰器指定，如果未指定，默认将是第一个参数。");
        // }

        // if (!validate.isObject(args[responseParamIndex || 1])) {
        //   throw new Error("response param 必须是对象类型，response param 可以通过 responseParamIndex 参数指定，也可以通过 ApiResponse 装饰器指定，如果未指定，默认将是第二个参数。");
        // }

        if (target.apiMap[key].type === "HTTP") {
          const requestOption: AxiosRequestConfig = {
            url: (target.namespace === "/" ? "" : target.namespace) + (target.apiMap[key].namespace === "/" ? "" : target.apiMap[key].namespace),
            method: (target.apiMap[key].option as IHTTPOption).methods
          }
  
          if (args.length > 0) {
            deepMerge(requestOption, args[requestParamIndex || 0]);
          }
  
          const result = await request(requestOption);
  
          deepMerge(args[responseParamIndex || 1], result);
  
          apiFunction(...args);
        } else if (target.apiMap[key].type === "CMD") {
          const stream = spawn((target.apiMap[key].option as ICMDOption).command, deepMerge((target.apiMap[key].option as ICMDOption).option, args[requestParamIndex || 0]));
          deepMerge(args[responseParamIndex || 1], stream);
          apiFunction(...args);
        } else if (target.apiMap[key].type === "PIPE") {
          const socket = createConnection((target.apiMap[key].option as NetConnectOpts));
          socket?.once("connect", () => {
            socket?.write(args[requestParamIndex || 0]);
          });
          deepMerge(args[responseParamIndex || 1], socket);
          apiFunction(...args);
        }
      };
    }

    return descriptor;
  }
}

export function ApiRequest() {
  return function (target: IServiceOption, propertyName: string, index: number) {
    console.log("ApiRequest", target, propertyName, index);
    if (!target.apiMap) target.apiMap = {};
    if (!target.apiMap[propertyName] || !validate.isObject(target.apiMap[propertyName])) {
      target.apiMap[propertyName] = {
        namespace: ""
      };
    }
    target.apiMap[propertyName].requestParamIndex = index;
  }
}

export function ApiResponse() {
  return function (target: IServiceOption, propertyName: string, index: number) {
    console.log("ApiResponse", target, propertyName, index);
    if (!target.apiMap) target.apiMap = {};
    if (!target.apiMap[propertyName] || !validate.isObject(target.apiMap[propertyName])) {
      target.apiMap[propertyName] = {
        namespace: ""
      };
    }
    target.apiMap[propertyName].responseParamIndex = index;
  }
}