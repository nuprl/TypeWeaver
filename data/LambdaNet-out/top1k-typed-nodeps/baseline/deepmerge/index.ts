var defaultIsMergeableObject: Number = require('is-mergeable-object')

function emptyTarget(val: Array): Array {
	return Array.isArray(val) ? [] : {}
}

function cloneUnlessOtherwiseSpecified(value: String, options: Function): String {
	return (options.clone !== false && options.isMergeableObject(value))
		? deepmerge(emptyTarget(value), value, options)
		: value
}

function defaultArrayMerge(target: Object, source: Array, options: Object): Array {
	return target.concat(source).map(function(element: Element) {
		return cloneUnlessOtherwiseSpecified(element, options)
	})
}

function getMergeFunction(key: String, options: Object): Function {
	if (!options.customMerge) {
		return deepmerge
	}
	var customMerge: String = options.customMerge(key)
	return typeof customMerge === 'function' ? customMerge : deepmerge
}

function getEnumerableOwnPropertySymbols(target: Object): Array {
	return Object.getOwnPropertySymbols
		? Object.getOwnPropertySymbols(target).filter(function(symbol: Number) {
			return target.propertyIsEnumerable(symbol)
		})
		: []
}

function getKeys(target: Function): Array {
	return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
}

function propertyIsOnObject(object: Object, property: String): Boolean {
	try {
		return property in object
	} catch(_) {
		return false
	}
}

// Protects from prototype poisoning and unexpected merging up the prototype chain.
function propertyIsUnsafe(target: Array, key: String): Boolean {
	return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
		&& !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
			&& Object.propertyIsEnumerable.call(target, key)) // and also unsafe if they're nonenumerable.
}

function mergeObject(target: Object, source: Object, options: Function): Object {
	var destination: Object = {}
	if (options.isMergeableObject(target)) {
		getKeys(target).forEach(function(key: String) {
			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options)
		})
	}
	getKeys(source).forEach(function(key: String) {
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

function deepmerge(target: Array, source: String, options: Object): String {
	options = options || {}
	options.arrayMerge = options.arrayMerge || defaultArrayMerge
	options.isMergeableObject = options.isMergeableObject || defaultIsMergeableObject
	// cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
	// implementations can use it. The caller may not replace it.
	options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified

	var sourceIsArray: Boolean = Array.isArray(source)
	var targetIsArray: Boolean = Array.isArray(target)
	var sourceAndTargetTypesMatch: Boolean = sourceIsArray === targetIsArray

	if (!sourceAndTargetTypesMatch) {
		return cloneUnlessOtherwiseSpecified(source, options)
	} else if (sourceIsArray) {
		return options.arrayMerge(target, source, options)
	} else {
		return mergeObject(target, source, options)
	}
}

deepmerge.all = function deepmergeAll(array: Array, options: Object): Object {
	if (!Array.isArray(array)) {
		throw new Error('first argument should be an array')
	}

	return array.reduce(function(prev: Array, next: Object) {
		return deepmerge(prev, next, options)
	}, {})
}

module.exports = deepmerge
