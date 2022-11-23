/// <reference types="node" />
declare var retry: any;
declare function attemptAsyncOperation(someInput: any, cb: Function): void;
declare function failingAsyncOperation(input: any, cb: Function): NodeJS.Immediate;
