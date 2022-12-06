/*!
 * depd
 * Copyright(c) 2014-2018 Douglas Christopher Wilson
 * MIT Licensed
 */
declare var relative: any;
declare var basePath: string;
declare function containsNamespace(str: string, namespace: any): string;
declare function convertDataDescriptorToAccessor(obj: any, prop: string, message: string): any;
declare function createArgumentsString(arity: any): any;
declare function createStackString(stack: any): string;
declare function eehaslisteners(emitter: any, type: any): any;
declare function isignored(namespace: any): boolean;
declare function istraced(namespace: any): any;
declare function log(message: string, site: any): void;
declare function callSiteLocation(callSite: any): any;
declare function defaultMessage(site: any): string;
declare function formatPlain(msg: string, caller: string, stack: string): string;
declare function formatColor(msg: string, caller: string, stack: string): string;
declare function formatLocation(callSite: string): any;
declare function getStack(): any;
declare function prepareObjectStackTrace(obj: any, stack: any): any;
declare function DeprecationError(namespace: any, message: string, stack: any): any;
