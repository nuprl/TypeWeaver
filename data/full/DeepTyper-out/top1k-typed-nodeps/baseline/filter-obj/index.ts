export function includeKeys(object: any, predicate: boolean): boolean {
	const result: {} = {};

	if (Array.isArray(predicate)) {
		for (const key of predicate) {
			const descriptor: PropertyDescriptor = Object.getOwnPropertyDescriptor(object, key);
			if (descriptor?.enumerable) {
				Object.defineProperty(result, key, descriptor);
			}
		}
	} else {
		// `Reflect.ownKeys()` is required to retrieve symbol properties
		for (const key of Reflect.ownKeys(object)) {
			const descriptor: PropertyDescriptor = Object.getOwnPropertyDescriptor(object, key);
			if (descriptor.enumerable) {
				const value: any = object[key];
				if (predicate(key, value, object)) {
					Object.defineProperty(result, key, descriptor);
				}
			}
		}
	}

	return result;
}

export function excludeKeys(object: any, predicate: boolean): boolean {
	if (Array.isArray(predicate)) {
		const set = new Set(predicate);
		return includeKeys(object, (key: any) => !set.has(key));
	}

	return includeKeys(object, (key: string, value: any, object: any) => !predicate(key, value, object));
}
