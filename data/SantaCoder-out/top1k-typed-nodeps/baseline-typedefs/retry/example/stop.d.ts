/// <reference types="node" />
declare var retry: any;
declare function attemptAsyncOperation(someInput: string, cb: any): void;
declare function failingAsyncOperation(input: any, cb: any): NodeJS.Immediate;
