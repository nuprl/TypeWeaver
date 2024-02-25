export class ObjectSchema {
    constructor(definitions: any);
    hasKey(key: string): boolean;
    merge(...objects: any[]): any;
    validate(object: any): void;
    [strategies]: Map<any, any>;
    [requiredKeys]: Map<any, any>;
}
declare const strategies: unique symbol;
declare const requiredKeys: unique symbol;
export {};
