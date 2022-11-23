import FormData from './classes/FormData.js';
declare const _default: {
    isBrowser: boolean;
    classes: {
        URLSearchParams: {
            new (init?: string | Record<string, string> | URLSearchParams | string[][]): URLSearchParams;
            prototype: URLSearchParams;
            toString(): string;
        } | typeof import("../../helpers/AxiosURLSearchParams.js").default;
        FormData: {
            new (form?: HTMLFormElement): FormData;
            prototype: FormData;
        };
        Blob: {
            new (blobParts?: BlobPart[], options?: BlobPropertyBag): Blob;
            prototype: Blob;
        };
    };
    isStandardBrowserEnv: boolean;
    protocols: string[];
};
export default _default;
