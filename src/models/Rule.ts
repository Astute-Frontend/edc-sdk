import BaseModel from "../core/model/base";
import { Model, Param } from "../core/model/decorator";
import { numberStringValidate, numberValidate } from "../validates/common";

export interface IVendorRule {
  type: string;
  vendor: string;
  product: string;
  enable?: string;
}

export interface IIfclsRule {
  type: string;
  ifcls: string;
  ifsubcls: string;
  ifpro: string;
  enable?: string;
}

export interface IDevclsRule {
  type: string;
  devcls: string;
  devsubcls: string;
  devpro: string;
  enable?: string;
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

  @Param<string>({
    namespace: "type",
    validate: numberStringValidate
  }) type: string;
  
  @Param<string>({
    namespace: "vendor",
    validate: numberStringValidate
  }) vendor: string;
  
  @Param<string>({
    namespace: "product",
    validate: numberStringValidate
  }) product: string;

  @Param<string>({
    namespace: "enable",
    validate: numberStringValidate
  }) enable?: string;
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

  @Param<string>({
    namespace: "type",
    validate: numberStringValidate
  }) type: string;
  
  @Param<string>({
    namespace: "ifcls",
    validate: numberStringValidate
  }) ifcls: string;
  
  @Param<string>({
    namespace: "ifsubcls",
    validate: numberStringValidate
  }) ifsubcls: string;
  
  @Param<string>({
    namespace: "ifpro",
    validate: numberStringValidate
  }) ifpro: string;

  @Param<string>({
    namespace: "enable",
    validate: numberStringValidate
  }) enable?: string;
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

  @Param<string>({
    namespace: "type",
    validate: numberStringValidate
  }) type: string;
  
  @Param<string>({
    namespace: "devcls",
    validate: numberStringValidate
  }) devcls: string;
  
  @Param<string>({
    namespace: "devsubcls",
    validate: numberStringValidate
  }) devsubcls: string;
  
  @Param<string>({
    namespace: "devpro",
    validate: numberStringValidate
  }) devpro: string;

  @Param<string>({
    namespace: "enable",
    validate: numberStringValidate
  }) enable?: string;
}