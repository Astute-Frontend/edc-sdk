export function isArray(value: any) {
	if (typeof Array.isArray === "function") {
		return Array.isArray(value);
	} else {
		return Object.prototype.toString.call(value) === "[object Array]";
	}
}

export function isObject(value: any) {
	return Object.prototype.toString.call(value) === "[object Object]";
}

export function isNumber(value: number) {
	return !isNaN(Number(value));
}

export function isFunction(value: any) {
	return typeof value == "function";
}

export function isString(value: any) {
	return typeof value == "string";
}

export function isEmpty(value: any) {
	if (isArray(value)) {
		return value.length === 0;
	}

	if (isObject(value)) {
		return Object.keys(value).length === 0;
	}

	return value === "" || value === undefined || value === null;
}

export function isBoolean(value: any) {
	return typeof value === "boolean";
}

export function isIP (ip: string) {
  return /^([01]?[0-9][0-9]?|2[0-4][0-9]|25[0-5])(\.([01]?[0-9][0-9]?|2[0-4][0-9]|25[0-5])){3}$/.test(ip);
}

export function isPort (port: number) {
  return port < 10 || port > 60000
}

export function isPromise(obj: unknown) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof (obj as Promise<unknown>).then === 'function';
}