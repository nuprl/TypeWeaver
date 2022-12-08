const processFunction: boolean = (function_: boolean, options: any, proxy: any, unwrapped: any) => (function(...arguments_) {
	const P: any = options.promiseModule;

	return new P((resolve: void, reject: void) => {
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
			arguments_.push((error: any, result: any) => {
				if (error) {
					reject(error);
				} else {
					resolve(result);
				}
			});
		} else {
			arguments_.push(resolve);
		}

		const self: any = this === proxy ? unwrapped : this;
		Reflect.apply(function_, self, arguments_);
	});
});

const filterCache: any = new WeakMap();

export default function pify(input: any, options: any): any {
	options = {
		exclude: [/.+(?:Sync|Stream)$/],
		errorFirst: true,
		promiseModule: Promise,
		...options,
	};

	const objectType: any = typeof input;
	if (!(input !== null && (objectType === 'object' || objectType === 'function'))) {
		throw new TypeError(`Expected \`input\` to be a \`Function\` or \`Object\`, got \`${input === null ? 'null' : objectType}\``);
	}

	const filter: any = (target: any, key: string) => {
		let cached: any = filterCache.get(target);

		if (!cached) {
			cached = {};
			filterCache.set(target, cached);
		}

		if (key in cached) {
			return cached[key];
		}

		const match: any = (pattern: any) => (typeof pattern === 'string' || typeof key === 'symbol') ? key === pattern : pattern.test(key);
		const descriptor: PropertyDescriptor = Reflect.getOwnPropertyDescriptor(target, key);
		const writableOrConfigurableOwn: boolean = (descriptor === undefined || descriptor.writable || descriptor.configurable);
		const included: any = options.include ? options.include.some((element: any) => match(element)) : !options.exclude.some((element: any) => match(element));
		const shouldFilter: any = included && writableOrConfigurableOwn;
		cached[key] = shouldFilter;
		return shouldFilter;
	};

	const cache: any = new WeakMap();

	const proxy: any = new Proxy(input, {
		apply(target, thisArg, args) {
			const cached: any = cache.get(target);

			if (cached) {
				return Reflect.apply(cached, thisArg, args);
			}

			const pified: any = options.excludeMain ? target : processFunction(target, options, proxy, target);
			cache.set(target, pified);
			return Reflect.apply(pified, thisArg, args);
		},

		get(target, key) {
			const property: any = target[key];

			// eslint-disable-next-line no-use-extend-native/no-use-extend-native
			if (!filter(target, key) || property === Function.prototype[key]) {
				return property;
			}

			const cached: any = cache.get(property);

			if (cached) {
				return cached;
			}

			if (typeof property === 'function') {
				const pified: any = processFunction(property, options, proxy, target);
				cache.set(property, pified);
				return pified;
			}

			return property;
		},
	});

	return proxy;
}
