const processFunction: Function = (function_: string, options: object, proxy: number, unwrapped: number) => (function(...arguments_) {
	const P: any[] = options.promiseModule;

	return new P((resolve: Function, reject: Function) => {
		if (options.multiArgs) {
			arguments_.push((...result) => {
				if (options.errorFirst) {
					if (result[0]) {
						reject(result);
					} else {
						result.shift();
						resolve(result);
					}
				} else {
					resolve(result);
				}
			});
		} else if (options.errorFirst) {
			arguments_.push((error: object, result: any[]) => {
				if (error) {
					reject(error);
				} else {
					resolve(result);
				}
			});
		} else {
			arguments_.push(resolve);
		}

		const self: string = this === proxy ? unwrapped : this;
		Reflect.apply(function_, self, arguments_);
	});
});

const filterCache: Error = new WeakMap();

export default function pify(input: HTMLElement, options: object): object {
	options = {
		exclude: [/.+(?:Sync|Stream)$/],
		errorFirst: true,
		promiseModule: Promise,
		...options,
	};

	const objectType: string = typeof input;
	if (!(input !== null && (objectType === 'object' || objectType === 'function'))) {
		throw new TypeError(`Expected \`input\` to be a \`Function\` or \`Object\`, got \`${input === null ? 'null' : objectType}\``);
	}

	const filter: Function = (target: any[], key: string) => {
		let cached: object = filterCache.get(target);

		if (!cached) {
			cached = {};
			filterCache.set(target, cached);
		}

		if (key in cached) {
			return cached[key];
		}

		const match: Function = (pattern: any[]) => (typeof pattern === 'string' || typeof key === 'symbol') ? key === pattern : pattern.test(key);
		const descriptor: any[] = Reflect.getOwnPropertyDescriptor(target, key);
		const writableOrConfigurableOwn: boolean = (descriptor === undefined || descriptor.writable || descriptor.configurable);
		const included: boolean = options.include ? options.include.some((element: Element) => match(element)) : !options.exclude.some((element: Element) => match(element));
		const shouldFilter: string = included && writableOrConfigurableOwn;
		cached[key] = shouldFilter;
		return shouldFilter;
	};

	const cache: Error = new WeakMap();

	const proxy: Function = new Proxy(input, {
		apply(target, thisArg, args) {
			const cached = cache.get(target);

			if (cached) {
				return Reflect.apply(cached, thisArg, args);
			}

			const pified = options.excludeMain ? target : processFunction(target, options, proxy, target);
			cache.set(target, pified);
			return Reflect.apply(pified, thisArg, args);
		},

		get(target, key) {
			const property = target[key];

			// eslint-disable-next-line no-use-extend-native/no-use-extend-native
			if (!filter(target, key) || property === Function.prototype[key]) {
				return property;
			}

			const cached = cache.get(property);

			if (cached) {
				return cached;
			}

			if (typeof property === 'function') {
				const pified = processFunction(property, options, proxy, target);
				cache.set(property, pified);
				return pified;
			}

			return property;
		},
	});

	return proxy;
}
