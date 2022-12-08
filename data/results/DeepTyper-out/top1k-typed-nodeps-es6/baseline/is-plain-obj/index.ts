export default function isPlainObject(value: any): boolean {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const prototype: any = Object.getPrototypeOf(value);
	return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
}
