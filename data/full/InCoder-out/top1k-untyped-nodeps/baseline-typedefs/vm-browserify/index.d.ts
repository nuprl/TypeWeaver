/// <reference types="node" />
declare var indexOf: (xs: any, item: any) => any;
declare var Object_keys: (obj: any) => any[];
declare var forEach: (xs: Array<T>, fn: (x: T) => boolean) => void;
declare var defineProp: (obj: any, name: any, value: any) => void;
declare var globals: string[];
declare function Context(): void;
declare var Script: (code: string | Buffer | NodeJ) => any;
