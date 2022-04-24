import BaseModel from "../core/model/base";
import { Model, Param } from "../core/model/decorator";
import USBRule from "./USBRule";
import { ipValidate, portValidate, stringValidate } from "../validates/common";

export interface IDesktop {
  name: string;
  ip: string;
  port: number;
  gwip?: string;
  gwport?: number;
  username: string;
  pwd: string;
  usbrule: USBRule;
}

@Model({
  namespace: "desktop",
  noDB: true
})
export default class Desktop extends BaseModel<IDesktop> implements IDesktop {
  constructor(option: IDesktop) {
    super();
    this.name = option.name;
    this.ip = option.ip;
    this.port = option.port;
    option.gwip && (this.gwip = option.gwip);
    option.gwport && (this.gwport = option.gwport);
    this.username = option.username;
    this.pwd = option.pwd;
    this.usbrule = option.usbrule;
  }

  @Param<string>({
    namespace: "name",
    validate: stringValidate
  }) name: string;

  @Param<string>({
    namespace: "ip",
    validate: ipValidate
  }) ip: string;

  @Param<number>({
    namespace: "port",
    validate: portValidate
  }) port: number;

  @Param<string>({
    namespace: "gwip",
    validate: ipValidate
  }) gwip?: string;

  @Param<number>({
    namespace: "gwport",
    validate: portValidate
  }) gwport?: number;

  
  @Param<string>({
    namespace: "username",
    validate: stringValidate
  }) username: string;

  @Param<string>({
    namespace: "pwd",
    validate: stringValidate
  }) pwd: string;

  @Param<string>({
    namespace: "usbrule"
  }) usbrule: USBRule;
}