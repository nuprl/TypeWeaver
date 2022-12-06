declare const statusCodeCacheableByDefault: Set<any>;
declare const understoodStatuses: Set<any>;
declare const errorStatusCodes: Set<any>;
declare const hopByHopHeaders: any;
declare const excludedFromRevalidationUpdate: any;
declare function toNumberOrZero(s: string): string;
declare function isErrorResponse(response: any): boolean;
declare function parseCacheControl(header: string): boolean;
declare function formatCacheControl(cc: string[]): any[];
