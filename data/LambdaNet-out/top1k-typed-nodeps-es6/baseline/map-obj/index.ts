const isObject: Function = (value: string) => typeof value === 'object' && value !== null;

// Customized for this use-case
const isObjectCustom: Function = (value: string) =>
	isObject(value)
	&& !(value instanceof RegExp)
	&& !(value instanceof Error)
	&& !(value instanceof Date)
	&& !(globalThis.Blob && value instanceof globalThis.Blob);

export const mapObjectSkip: string = Symbol('mapObjectSkip');

const _mapObject: Function = (object: Function, mapper: Function, options: object, isSeen: Map = new WeakMap()) => {
	options = {
		deep: false,
		target: {},
		...options,
	};

	if (isSeen.has(object)) {
		return isSeen.get(object);
	}

	isSeen.set(object, options.target);

	const {target} = options;
	delete options.target;

	const mapArray: Function = (array: any[]) => array.map((element: Element) => isObjectCustom(element) ? _mapObject(element, mapper, options, isSeen) : element);
	if (Array.isArray(object)) {
		return mapArray(object);
	}

	for (const [key, value] of Object.entries(object)) {
		const mapResult: any[] = mapper(key, value, object);

		if (mapResult === mapObjectSkip) {
			continue;
		}

		let [newKey, newValue, {shouldRecurse = true} = {}] = mapResult;

		// Drop `__proto__` keys.
		if (newKey === '__proto__') {
			continue;
		}

		if (options.deep && shouldRecurse && isObjectCustom(newValue)) {
			newValue = Array.isArray(newValue)
				? mapArray(newValue)
				: _mapObject(newValue, mapper, options, isSeen);
		}

		target[newKey] = newValue;
	}

	return target;
};

export default function mapObject(object: string, mapper: Function, options: object): string {
	if (!isObject(object)) {
		throw new TypeError(`Expected an object, got \`${object}\` (${typeof object})`);
	}

	if (Array.isArray(object)) {
		throw new TypeError('Expected an object, got an array');
	}

	return _mapObject(object, mapper, options);
}
