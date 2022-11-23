/// <reference types="node" />
import URLSearchParams from './classes/URLSearchParams.js';
import FormData from './classes/FormData.js';
declare const _default: {
    isNode: boolean;
    classes: {
        URLSearchParams: typeof URLSearchParams;
        FormData: typeof FormData;
        Blob: {
            new (blobParts?: BlobPart[], options?: BlobPropertyBag): Blob;
            prototype: Blob;
        };
    };
    protocols: string[];
};
export default _default;
