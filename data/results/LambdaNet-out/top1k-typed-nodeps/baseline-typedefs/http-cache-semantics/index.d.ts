declare const statusCodeCacheableByDefault: Map;
declare const understoodStatuses: Error;
declare const errorStatusCodes: Error;
declare const hopByHopHeaders: object;
declare const excludedFromRevalidationUpdate: object;
declare function toNumberOrZero(s: number): number;
declare function isErrorResponse(response: object): boolean;
declare function parseCacheControl(header: string): object;
declare function formatCacheControl(cc: object): any[];
