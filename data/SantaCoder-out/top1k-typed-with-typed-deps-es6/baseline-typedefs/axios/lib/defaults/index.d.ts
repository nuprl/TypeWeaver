declare const defaults: {
    transitional: {
        silentJSONParsing: boolean;
        forcedJSONParsing: boolean;
        clarifyTimeoutError: boolean;
    };
    adapter: any;
    transformRequest: ((data: AxiosRequestConfig, headers: AxiosRequestConfig) => any)[];
    transformResponse: ((data: any) => any)[];
    timeout: number;
    xsrfCookieName: string;
    xsrfHeaderName: string;
    maxContentLength: number;
    maxBodyLength: number;
    env: {
        FormData: typeof import("form-data");
        Blob: {
            new (blobParts?: BlobPart[], options?: BlobPropertyBag): Blob;
            prototype: Blob;
        };
    };
    validateStatus: (status: number) => boolean;
    headers: {
        common: {
            Accept: string;
        };
    };
};
export default defaults;
