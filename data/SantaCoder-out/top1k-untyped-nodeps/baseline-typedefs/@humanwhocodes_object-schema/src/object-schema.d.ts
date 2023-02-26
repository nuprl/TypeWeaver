declare const MergeStrategy: any;
declare const ValidationStrategy: any;
declare const strategies: unique symbol;
declare const requiredKeys: unique symbol;
declare function validateDefinition(name: string, strategy: string): void;
declare class ObjectSchema {
    constructor(definitions: any);
    hasKey(key: any): any;
    merge(...objects: any[]): any;
    validate(object: any): void;
}
