import { validate } from "../core/utils"

export function stringValidate(str: string) {
  return new Promise((resolve, reason) => {
    validate.isString(str) ? resolve({}) : reason(new Error("Must be a string"));
  })
}

export function numberValidate(count: number) {
  return new Promise((resolve, reason) => {
    validate.isNumber(count) ? resolve({}) : reason(new Error("Must be a number"));
  });
}

export function numberStringValidate(count: string) {
  const countNumber = parseInt(count);

  if (!countNumber) {
    return Promise.reject(new Error("Incorrect number format"));
  }

  return portValidate(countNumber);
}

export function ipValidate(ip: string) {
  return new Promise((resolve, reason) => {
    if (!validate.isString(ip)) {
      reason(new Error("must be a string"));
    } else if (!validate.isIP(ip)) {
      reason(new Error("Incorrect IP format"));
    } else {
      resolve({});
    }
  })
}

export function portValidate(port: number) {
  return new Promise((resolve, reason) => {
    if (!validate.isNumber(port)) {
      reason(new Error("Port must be a number"));
    } else if (validate.isPort(port)) {
      reason(new Error("Port must be between 10 and 60000"));
    } else {
      resolve({});
    }
  });
}

export function portStringValidate(port: string) {
  const portNumber = parseInt(port);

  if (!portNumber) {
    return Promise.reject(new Error("Incorrect port format"));
  }

  return portValidate(portNumber);
}