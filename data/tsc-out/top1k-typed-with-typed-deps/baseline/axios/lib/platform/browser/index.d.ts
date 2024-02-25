declare namespace _default {
    export const isBrowser: boolean;
    export namespace classes {
        export { URLSearchParams };
        export { FormData };
        export const Blob: {
            new (blobParts?: BlobPart[], options?: BlobPropertyBag): Blob;
            prototype: Blob;
        };
    }
    export { isStandardBrowserEnv };
    export const protocols: string[];
}
export default _default;
import URLSearchParams from "./classes/URLSearchParams.js";
import FormData from "./classes/FormData.js";
/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 *
 * @returns {boolean}
 */
declare const isStandardBrowserEnv: boolean;
