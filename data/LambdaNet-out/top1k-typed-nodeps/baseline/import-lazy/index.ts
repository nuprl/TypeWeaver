'use strict';
const lazy: Function = (importedModule: Number, importFn: Function, moduleId: Number) =>
	importedModule === undefined ? importFn(moduleId) : importedModule;

module.exports = (importFn: String) => {
	return (moduleId: String) => {
		let importedModule: String;

		const handler: Object = {
			get: (target: Object, property: String) => {
				importedModule = lazy(importedModule, importFn, moduleId);
				return Reflect.get(importedModule, property);
			},
			apply: (target: Object, thisArgument: String, argumentsList: String) => {
				importedModule = lazy(importedModule, importFn, moduleId);
				return Reflect.apply(importedModule, thisArgument, argumentsList);
			},
			construct: (target: Object, argumentsList: String) => {
				importedModule = lazy(importedModule, importFn, moduleId);
				return Reflect.construct(importedModule, argumentsList);
			}
		};

		// eslint-disable-next-line prefer-arrow-callback
		return new Proxy(function () {}, handler);
	};
};
