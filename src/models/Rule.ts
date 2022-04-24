import BaseModel from "../core/model/base";
import { Model, Param } from "../core/model/decorator";
import { numberValidate } from "../validates/common";

export interface IVendorRule {
  type: number;
  vendor: number;
  product: number;
  enable?: number;
}

export interface IIfclsRule {
  type: number;
  ifcls: number;
  ifsubcls: number;
  ifpro: number;
  enable?: number;
}

export interface IDevclsRule {
  type: number;
  devcls: number;
  devsubcls: number;
  devpro: number;
  enable?: number;
}

@Model({
  namespace: "usb_rule",
  noDB: true
})
export class VendorRule extends BaseModel<IVendorRule> implements IVendorRule {
  constructor (option: IVendorRule) {
    super();
    this.product = option.product;
    this.type = option.type;
    this.vendor = option.vendor;
    this.enable = option.enable;
  }

  @Param<number>({
    namespace: "type",
    validate: numberValidate
  }) type: number;
  
  @Param<number>({
    namespace: "vendor",
    validate: numberValidate
  }) vendor: number;
  
  @Param<number>({
    namespace: "product",
    validate: numberValidate
  }) product: number;

  @Param<number>({
    namespace: "enable",
    validate: numberValidate
  }) enable?: number;
}

@Model({
  namespace: "usb_rule",
  noDB: true
})
export class IfclsRule extends BaseModel<IIfclsRule> implements IIfclsRule {
  constructor(option: IIfclsRule) {
    super();
    this.type = option.type;
    this.ifcls = option.ifcls;
    this.ifsubcls = option.ifsubcls;
    this.ifpro = option.ifpro;
    this.enable = option.enable;
  }

  @Param<number>({
    namespace: "type",
    validate: numberValidate
  }) type: number;
  
  @Param<number>({
    namespace: "ifcls",
    validate: numberValidate
  }) ifcls: number;
  
  @Param<number>({
    namespace: "ifsubcls",
    validate: numberValidate
  }) ifsubcls: number;
  
  @Param<number>({
    namespace: "ifpro",
    validate: numberValidate
  }) ifpro: number;

  @Param<number>({
    namespace: "enable",
    validate: numberValidate
  }) enable?: number;
}

@Model({
  namespace: "usb_rule",
  noDB: true
})
export class DevclsRule extends BaseModel<IDevclsRule> implements IDevclsRule {
  constructor(option: IDevclsRule) {
    super();
    this.type = option.type;
    this.devcls = option.devcls;
    this.devsubcls = option.devsubcls;
    this.devpro = option.devpro;
    this.enable = option.enable;
  }

  @Param<number>({
    namespace: "type",
    validate: numberValidate
  }) type: number;
  
  @Param<number>({
    namespace: "devcls",
    validate: numberValidate
  }) devcls: number;
  
  @Param<number>({
    namespace: "devsubcls",
    validate: numberValidate
  }) devsubcls: number;
  
  @Param<number>({
    namespace: "devpro",
    validate: numberValidate
  }) devpro: number;

  @Param<number>({
    namespace: "enable",
    validate: numberValidate
  }) enable?: number;
}