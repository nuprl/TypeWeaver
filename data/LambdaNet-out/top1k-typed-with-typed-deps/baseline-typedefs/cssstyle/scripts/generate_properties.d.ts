declare var fs: string;
declare var path: string;
declare var babylon: string;
declare var t: HTMLElement;
declare var generate: Function;
declare var traverse: object;
declare var resolve: any[];
declare var camelToDashed: Function;
declare var basename: Function;
declare var dirname: any[];
declare var uniqueIndex: number;
declare function getUniqueIndex(): number;
declare var property_files: any[];
declare var out_file: string;
declare var date_today: HTMLInputElement;
declare function isModuleDotExports(node: object): boolean;
declare function isRequire(node: object, filename: string): boolean;
declare var parsedFilesByPath: object;
declare var externalDependencies: any[];
declare var parsedFiles: any[];
declare var addedFiles: object;
declare function addFile(filename: string, dependencyPath: string): void;
declare var moduleExportsByPath: Function;
declare var statements: any[];
declare function getRequireValue(node: object, file: object): Promise;
declare var propertyDefinitions: any[];
declare var definePropertiesCall: string;
