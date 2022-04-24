import * as ref from "ref-napi";
import * as refStruct from "ref-struct-di";
import os from "os";
import net from "net";
import { isIP, isNumber, isPort, isString } from "../utils/validate";

function Desktop(option) {
  // name字段
  if (!isString(option.name)) {
    throw new Error("Name must ba a string");
  } else {
    this.name = option.name;
  }

  // ip字段
  if (!isString(option.ip)) {
    throw new Error("Ip must be a string");
  } else if (!isIP(option.ip)) {
    throw new Error("Incorrect IP format");
  } else {
    this.ip = option.ip
  }

  // port字段
  if (!isNumber(option.port)) {
    throw new Error("Port must be a number");
  } else if (isPort(option.port)) {
    throw new Error("Port must be between 10 and 60000");
  } else {
    this.port = option.port;
  }

  // gwip 字段
  if (!option.gwip) {
    this.gwip = undefined;
  } else if (!isString(option.gwip)) {
    throw new Error("GwIp must be a string");
  } else if (!isIP(option.gwip)) {
    throw new Error("Incorrect IP format");
  }

  // gwport 字段
  
}

function EDCSDK() {
  // 初始化
  this.init = function() {
    console.log("init methods");
  }

  // 刷新桌面列表
  this.refresh = function() {
    console.log("refresh methods");
  }

  // 销毁
  this.destroyed = function() {
    console.log("destroyed methods")
  }
}

module.exports = {
  EDCSDK
}