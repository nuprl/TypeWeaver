declare const MergeStrategy: any;
declare const ValidationStrategy: any;
declare const strategies: symbol;
declare const requiredKeys: symbol;
declare function validateDefinition(name: string, strategy: any): void;
declare class ObjectSchema {
    constructor(definitions: any);
    hasKey(key: any): any;
    merge(...objects: any[]): any;
    validate(object: any): void;
}
