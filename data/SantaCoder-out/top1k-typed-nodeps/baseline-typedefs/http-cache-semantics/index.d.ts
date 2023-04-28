declare const statusCodeCacheableByDefault: Set<number>;
declare const understoodStatuses: Set<number>;
declare const errorStatusCodes: Set<number>;
declare const hopByHopHeaders: {
    date: boolean;
    connection: boolean;
    'keep-alive': boolean;
    'proxy-authenticate': boolean;
    'proxy-authorization': boolean;
    te: boolean;
    trailer: boolean;
    'transfer-encoding': boolean;
    upgrade: boolean;
};
declare const excludedFromRevalidationUpdate: {
    'content-length': boolean;
    'content-encoding': boolean;
    'transfer-encoding': boolean;
    'content-range': boolean;
};
declare function toNumberOrZero(s: string): number;
declare function isErrorResponse(response: Response): boolean;
declare function parseCacheControl(header: string): {};
declare function formatCacheControl(cc: string): string;
