declare namespace _default {
    const isNode: boolean;
    namespace classes {
        export { URLSearchParams };
        export { FormData };
        export const Blob: {
            new (blobParts?: BlobPart[], options?: BlobPropertyBag): Blob;
            prototype: Blob;
        };
    }
    const protocols: string[];
}
export default _default;
import URLSearchParams from "./classes/URLSearchParams.js";
import FormData from "./classes/FormData.js";
