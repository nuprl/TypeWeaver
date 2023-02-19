export default function defineLazyProperty(object: Object, propertyName: string, valueGetter: any): void {
	const define: void = (value: any) => Object.defineProperty(object, propertyName, {value, enumerable: true, writable: true});

	Object.defineProperty(object, propertyName, {
		configurable: true,
		enumerable: true,
		get() {
			const result: any = valueGetter();
			define(result);
			return result;
		},
		set(value) {
			define(value);
		}
	});

	return object;
}
