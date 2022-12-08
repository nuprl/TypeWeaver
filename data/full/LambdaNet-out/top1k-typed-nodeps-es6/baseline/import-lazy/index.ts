'use strict';
const lazy: Function = (importedModule: number, importFn: Function, moduleId: number) =>
	importedModule === undefined ? importFn(moduleId) : importedModule;

export default (importFn: string) => {
	return (moduleId: string) => {
		let importedModule: string;

		const handler: object = {
			get: (target: object, property: string) => {
				importedModule = lazy(importedModule, importFn, moduleId);
				return Reflect.get(importedModule, property);
			},
			apply: (target: object, thisArgument: string, argumentsList: string) => {
				importedModule = lazy(importedModule, importFn, moduleId);
				return Reflect.apply(importedModule, thisArgument, argumentsList);
			},
			construct: (target: object, argumentsList: string) => {
				importedModule = lazy(importedModule, importFn, moduleId);
				return Reflect.construct(importedModule, argumentsList);
			}
		};

		// eslint-disable-next-line prefer-arrow-callback
		return new Proxy(function () {}, handler);
	};
};
