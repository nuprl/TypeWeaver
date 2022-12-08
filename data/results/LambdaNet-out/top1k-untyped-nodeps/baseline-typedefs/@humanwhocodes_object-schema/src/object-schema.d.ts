declare const MergeStrategy: any;
declare const ValidationStrategy: any;
declare const strategies: string;
declare const requiredKeys: string;
declare function validateDefinition(name: string, strategy: ObjectSchema): void;
declare class ObjectSchema {
    constructor(definitions: any);
    hasKey(key: any): any;
    merge(...objects: any[]): any;
    validate(object: any): void;
}
