export default defaults;
declare namespace defaults {
    export { transitionalDefaults as transitional };
    export const adapter: Function;
    export const transformRequest: ((data: any, headers: any) => any)[];
    export const transformResponse: ((data: any) => any)[];
    export const timeout: number;
    export const xsrfCookieName: string;
    export const xsrfHeaderName: string;
    export const maxContentLength: number;
    export const maxBodyLength: number;
    export namespace env {
        const FormData: typeof import("form-data");
        const Blob: {
            new (blobParts?: BlobPart[], options?: BlobPropertyBag): Blob;
            prototype: Blob;
        };
    }
    export function validateStatus(status: any): boolean;
    export namespace headers {
        namespace common {
            const Accept: string;
        }
    }
}
import transitionalDefaults from "./transitional.js";
