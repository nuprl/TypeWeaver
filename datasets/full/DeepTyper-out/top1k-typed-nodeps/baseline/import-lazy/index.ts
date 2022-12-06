'use strict';
const lazy: boolean = (importedModule, importFn, moduleId) =>
	importedModule === undefined ? importFn(moduleId) : importedModule;

module.exports = (importFn: any) => {
	return moduleId => {
		let importedModule: any;

		const handler: any = {
			get: (target: any, property: string) => {
				importedModule = lazy(importedModule, importFn, moduleId);
				return Reflect.get(importedModule, property);
			},
			apply: (target: any, thisArgument: number, argumentsList: number) => {
				importedModule = lazy(importedModule, importFn, moduleId);
				return Reflect.apply(importedModule, thisArgument, argumentsList);
			},
			construct: (target: any, argumentsList: string) => {
				importedModule = lazy(importedModule, importFn, moduleId);
				return Reflect.construct(importedModule, argumentsList);
			}
		};

		// eslint-disable-next-line prefer-arrow-callback
		return new Proxy(function () {}, handler);
	};
};
