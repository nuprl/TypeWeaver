export type Resolver = import("./Resolver");
export type ResolveContext = import("./Resolver").ResolveContext;
export type DescriptionFileInfo = {
    content?: any | undefined;
    path: string;
    directory: string;
};
export type ErrorFirstCallback = (error?: (Error | null) | undefined, result?: DescriptionFileInfo | undefined) => any;
/** @typedef {import("./Resolver")} Resolver */
/** @typedef {import("./Resolver").ResolveContext} ResolveContext */
/**
 * @typedef {Object} DescriptionFileInfo
 * @property {any=} content
 * @property {string} path
 * @property {string} directory
 */
/**
 * @callback ErrorFirstCallback
 * @param {Error|null=} error
 * @param {DescriptionFileInfo=} result
 */
/**
 * @param {Resolver} resolver resolver
 * @param {string} directory directory
 * @param {string[]} filenames filenames
 * @param {DescriptionFileInfo|undefined} oldInfo oldInfo
 * @param {ResolveContext} resolveContext resolveContext
 * @param {ErrorFirstCallback} callback callback
 */
export function loadDescriptionFile(resolver: Resolver, directory: string, filenames: string[], oldInfo: DescriptionFileInfo | undefined, resolveContext: ResolveContext, callback: ErrorFirstCallback): void;
/**
 * @param {any} content content
 * @param {string|string[]} field field
 * @returns {object|string|number|boolean|undefined} field data
 */
export function getField(content: any, field: string | string[]): object | string | number | boolean | undefined;
/**
 * @param {string} directory directory
 * @returns {string|null} parent directory or null
 */
export function cdUp(directory: string): string | null;
