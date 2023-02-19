export default class CachePolicy {
    constructor(req: any, res: any, { shared, cacheHeuristic, immutableMinTimeToLive, ignoreCargoCult, _fromObject, }?: {
        shared: any;
        cacheHeuristic: any;
        immutableMinTimeToLive: any;
        ignoreCargoCult: any;
        _fromObject: any;
    });
    now(): number;
    storable(): boolean;
    _hasExplicitExpiration(): any;
    _assertRequestHasHeaders(req: any): void;
    satisfiesWithoutRevalidation(req: any): boolean;
    _requestMatches(req: any, allowHeadMethod: any): boolean;
    _allowsStoringAuthenticated(): any;
    _varyMatches(req: any): boolean;
    _copyWithoutHopByHopHeaders(inHeaders: any): object;
    responseHeaders(): CachePolicy;
    date(): any;
    age(): string;
    _ageValue(): number;
    maxAge(): number;
    timeToLive(): number;
    stale(): boolean;
    _useStaleIfError(): boolean;
    useStaleWhileRevalidate(): boolean;
    static fromObject(obj: any): CachePolicy;
    _fromObject(obj: any): void;
    toObject(): {
        v: number;
        t: any;
        sh: any;
        ch: any;
        imm: any;
        st: any;
        resh: any;
        rescc: any;
        m: any;
        u: any;
        h: any;
        a: any;
        reqh: any;
        reqcc: any;
    };
    revalidationHeaders(incomingReq: any): object;
    revalidatedPolicy(request: any, response: any): {
        policy: any;
        modified: boolean;
        matches: boolean;
    };
}
