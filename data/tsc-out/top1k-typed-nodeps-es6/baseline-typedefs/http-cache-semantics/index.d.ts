export default class CachePolicy {
    static fromObject(obj: any): CachePolicy;
    constructor(req: any, res: any, { shared, cacheHeuristic, immutableMinTimeToLive, ignoreCargoCult, _fromObject, }?: {
        shared: any;
        cacheHeuristic: any;
        immutableMinTimeToLive: any;
        ignoreCargoCult: any;
        _fromObject: any;
    });
    _responseTime: number;
    _isShared: boolean;
    _cacheHeuristic: any;
    _immutableMinTtl: any;
    _status: any;
    _resHeaders: any;
    _rescc: {};
    _method: any;
    _url: any;
    _host: any;
    _noAuthorization: boolean;
    _reqHeaders: any;
    _reqcc: {};
    now(): number;
    storable(): boolean;
    _hasExplicitExpiration(): any;
    _assertRequestHasHeaders(req: any): void;
    satisfiesWithoutRevalidation(req: any): boolean;
    _requestMatches(req: any, allowHeadMethod: any): boolean;
    _allowsStoringAuthenticated(): any;
    _varyMatches(req: any): boolean;
    _copyWithoutHopByHopHeaders(inHeaders: any): {
        warning: any;
    };
    responseHeaders(): {
        warning: any;
    };
    date(): number;
    age(): number;
    _ageValue(): number;
    maxAge(): any;
    timeToLive(): number;
    stale(): boolean;
    _useStaleIfError(): boolean;
    useStaleWhileRevalidate(): boolean;
    _fromObject(obj: any): void;
    toObject(): {
        v: number;
        t: number;
        sh: boolean;
        ch: any;
        imm: any;
        st: any;
        resh: any;
        rescc: {};
        m: any;
        u: any;
        h: any;
        a: boolean;
        reqh: any;
        reqcc: {};
    };
    revalidationHeaders(incomingReq: any): {
        warning: any;
    };
    revalidatedPolicy(request: any, response: any): any;
}
