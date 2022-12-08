/*!
 * depd
 * Copyright(c) 2014-2018 Douglas Christopher Wilson
 * MIT Licensed
 */
declare var relative: Function;
declare var basePath: string;
declare function containsNamespace(str: string, namespace: string): boolean;
declare function convertDataDescriptorToAccessor(obj: any[], prop: string, message: string): object;
declare function createArgumentsString(arity: string): string;
declare function createStackString(stack: any[]): string;
declare function eehaslisteners(emitter: HTMLElement, type: string): boolean;
declare function isignored(namespace: string): boolean;
declare function istraced(namespace: string): boolean;
declare function log(message: string, site: any[]): void;
declare function callSiteLocation(callSite: HTMLElement): any[];
declare function defaultMessage(site: object): number;
declare function formatPlain(msg: string, caller: number, stack: any[]): string;
declare function formatColor(msg: string, caller: number, stack: any[]): string;
declare function formatLocation(callSite: object): string;
declare function getStack(): any[];
declare function prepareObjectStackTrace(obj: Function, stack: number): string;
declare function DeprecationError(namespace: string, message: string, stack: string): object;
