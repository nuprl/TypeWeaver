import defaultIsMergeableObject from 'is-mergeable-object';

function emptyTarget(val: any[]): any[] {
	return Array.isArray(val) ? [] : {}
}

function cloneUnlessOtherwiseSpecified(value: string, options: Function): string {
	return (options.clone !== false && options.isMergeableObject(value))
		? deepmerge(emptyTarget(value), value, options)
		: value
}

function defaultArrayMerge(target: object, source: any[], options: object): any[] {
	return target.concat(source).map(function(element: Element) {
		return cloneUnlessOtherwiseSpecified(element, options)
	})
}

function getMergeFunction(key: string, options: object): Function {
	if (!options.customMerge) {
		return deepmerge
	}
	var customMerge: string = options.customMerge(key)
	return typeof customMerge === 'function' ? customMerge : deepmerge
}

function getEnumerableOwnPropertySymbols(target: object): any[] {
	return Object.getOwnPropertySymbols
		? Object.getOwnPropertySymbols(target).filter(function(symbol: number) {
			return target.propertyIsEnumerable(symbol)
		})
		: []
}

function getKeys(target: Function): any[] {
	return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
}

function propertyIsOnObject(object: object, property: string): boolean {
	try {
		return property in object
	} catch(_) {
		return false
	}
}

// Protects from prototype poisoning and unexpected merging up the prototype chain.
function propertyIsUnsafe(target: any[], key: string): boolean {
	return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
		&& !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
			&& Object.propertyIsEnumerable.call(target, key)) // and also unsafe if they're nonenumerable.
}

function mergeObject(target: object, source: object, options: Function): object {
	var destination: object = {}
	if (options.isMergeableObject(target)) {
		getKeys(target).forEach(function(key: string) {
			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options)
		})
	}
	getKeys(source).forEach(function(key: string) {
		if (propertyIsUnsafe(target, key)) {
			return
		}

		if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
			destination[key] = getMergeFunction(key, options)(target[key], source[key], options)
		} else {
			destination[key] = cloneUnlessOtherwiseSpecified(source[key], options)
		}
	})
	return destination
}

function deepmerge(target: any[], source: string, options: object): any[] {
	options = options || {}
	options.arrayMerge = options.arrayMerge || defaultArrayMerge
	options.isMergeableObject = options.isMergeableObject || defaultIsMergeableObject
	// cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
	// implementations can use it. The caller may not replace it.
	options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified

	var sourceIsArray: boolean = Array.isArray(source)
	var targetIsArray: boolean = Array.isArray(target)
	var sourceAndTargetTypesMatch: boolean = sourceIsArray === targetIsArray

	if (!sourceAndTargetTypesMatch) {
		return cloneUnlessOtherwiseSpecified(source, options)
	} else if (sourceIsArray) {
		return options.arrayMerge(target, source, options)
	} else {
		return mergeObject(target, source, options)
	}
}

deepmerge.all = function deepmergeAll(array: any[], options: object): object {
	if (!Array.isArray(array)) {
		throw new Error('first argument should be an array')
	}

	return array.reduce(function(prev: Function, next: object) {
		return deepmerge(prev, next, options)
	}, {})
}

export default deepmerge;
