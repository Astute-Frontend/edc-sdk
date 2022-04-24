import BaseModel from "../core/model/base";
import { Model, Param } from "../core/model/decorator";
import { numberValidate } from "../validates/common";
import { VendorRule, IfclsRule, DevclsRule } from "./Rule";

export interface IUSBRule {
  listtype: number;
  rulelist: Array<VendorRule | IfclsRule | DevclsRule>;
  exceptionlist: Array<VendorRule | IfclsRule | DevclsRule>;
}

@Model({
  namespace: "usb_rule",
  noDB: true
})
export default class USBRule extends BaseModel<IUSBRule> implements IUSBRule {
  constructor(option: IUSBRule) {
    super();

    this.listtype = option.listtype;
    this.rulelist = option.rulelist;
    this.exceptionlist = option.exceptionlist;
  }

  @Param<number>({
    namespace: "listtype",
    validate: numberValidate
  }) listtype: number;

  @Param<Array<VendorRule | IfclsRule | DevclsRule>>({
    namespace: "rulelist"
  }) rulelist: Array<VendorRule | IfclsRule | DevclsRule>;

  @Param<Array<VendorRule | IfclsRule | DevclsRule>>({
    namespace: "exceptionlist"
  }) exceptionlist: Array<VendorRule | IfclsRule | DevclsRule>;
}