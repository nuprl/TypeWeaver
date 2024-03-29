var defaultIsMergeableObject = require('is-mergeable-object')

function emptyTarget(val: ny) {
	return Array.isArray(val) ? [] : {}
}

function cloneUnlessOtherwiseSpecified(value: any,  options: any) {
	return (options.clone !== false && options.isMergeableObject(value))
		? deepmerge(emptyTarget(value), value, options)
		: value
}

function defaultArrayMerge(target: ArrayLike<T>,  source: ArrayLike<T>,  options: Object) {
	return target.concat(source).map(function(element: Element) {
		return cloneUnlessOtherwiseSpecified(element, options)
	})
}

function getMergeFunction(key: any,  options: any) {
	if (!options.customMerge) {
		return deepmerge
	}
	var customMerge = options.customMerge(key)
	return typeof customMerge === 'function' ? customMerge : deepmerge
}

function getEnumerableOwnPropertySymbols(target: Object) {
	return Object.getOwnPropertySymbols
		? Object.getOwnPropertySymbols(target).filter(function(symbol: any) {
			return target.propertyIsEnumerable(symbol)
		})
		: []
}

function getKeys(target: any) {
	return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
}

function propertyIsOnObject(object: any,  property: string | symbol) {
	try {
		return property in object
	} catch(_) {
		return false
	}
}

// Protects from prototype poisoning and unexpected merging up the prototype chain.
function propertyIsUnsafe(target: Object,  key: PropertyKey) {
	return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
		&& !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
			&& Object.propertyIsEnumerable.call(target, key)) // and also unsafe if they're nonenumerable.
}

function mergeObject(target: Object,  source: Object,  options: Object) {
	var destination = {}
	if (options.isMergeableObject(target)) {
		getKeys(target).forEach(function(key: any) {
			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options)
		})
	}
	getKeys(source).forEach(function(key: any) {
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

function deepmerge(target: any,  source: any,  options: any) {
	options = options || {}
	options.arrayMerge = options.arrayMerge || defaultArrayMerge
	options.isMergeableObject = options.isMergeableObject || defaultIsMergeableObject
	// cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
	// implementations can use it. The caller may not replace it.
	options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified

	var sourceIsArray = Array.isArray(source)
	var targetIsArray = Array.isArray(target)
	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray

	if (!sourceAndTargetTypesMatch) {
		return cloneUnlessOtherwiseSpecified(source, options)
	} else if (sourceIsArray) {
		return options.arrayMerge(target, source, options)
	} else {
		return mergeObject(target, source, options)
	}
}

deepmerge.all = function deepmergeAll(array: Array<any>,  options: DeepMergeOptions) {
	if (!Array.isArray(array)) {
		throw new Error('first argument should be an array')
	}

	return array.reduce(function(prev: any,  next: any) {
		return deepmerge(prev, next, options)
	}, {})
}

module.exports = deepmerge