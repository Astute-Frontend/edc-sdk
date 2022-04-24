import { SpawnOptionsWithoutStdio } from "child_process";
import { NetConnectOpts } from "net";

export interface IHTTPOption {
  url: string;
  methods?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
}

// export interface IPIPEOption {
//   option: NetConnectOpts;
// }

export interface ICMDOption {
  command: string;
  option?: SpawnOptionsWithoutStdio;
}

export interface IApiOption {
  namespace: string;
  type?: "HTTP" | "PIPE" | "CMD",
  option?: IHTTPOption | NetConnectOpts | ICMDOption;
  requestParamIndex?: number;
  responseParamIndex?: number;
  before?: (requestParam: unknown) => Promise<unknown>;
}

export interface IServiceOption {
  namespace: string;
  apiMap: { [namespace: string]: IApiOption }
}

export default class BaseService<T> implements IServiceOption {
  namespace!: string;

  apiMap!: { [name: string]: IApiOption };
}