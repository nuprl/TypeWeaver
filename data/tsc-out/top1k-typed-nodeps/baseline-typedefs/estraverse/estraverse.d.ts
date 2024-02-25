export function cloneEnvironment(): typeof import("./estraverse");
export var Syntax: any;
export function traverse(root: any, visitor: any): void;
export function replace(root: any, visitor: any): any;
export function attachComments(tree: any, providedComments: any, tokens: any): any;
export var VisitorKeys: any;
export var VisitorOption: any;
export function Controller(): void;
export class Controller {
    path(): any[];
    type(): any;
    parents(): any[];
    current(): any;
    __execute(callback: any, element: any): any;
    __current: any;
    __state: any;
    notify(flag: any): void;
    skip(): void;
    break(): void;
    remove(): void;
    __initialize(root: any, visitor: any): void;
    visitor: any;
    root: any;
    __worklist: any[];
    __leavelist: any[];
    __fallback: any;
    __keys: any;
    traverse(root: any, visitor: any): void;
    replace(root: any, visitor: any): any;
}
declare namespace __estraverse_ { }
export {};
