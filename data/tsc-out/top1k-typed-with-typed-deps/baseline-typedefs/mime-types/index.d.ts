export namespace charsets {
    export { charset as lookup };
}
export const extensions: any;
export const types: any;
export function charset(type: string): boolean | string;
export function contentType(str: string): boolean | string;
export function extension(type: string): boolean | string;
export function lookup(path: string): boolean | string;
