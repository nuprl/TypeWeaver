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
    /**
     * Value of the Date response header or current time if Date was invalid
     * @return timestamp
     */
    date(): number;
    /**
     * Value of the Age header, in seconds, updated for the current time.
     * May be fractional.
     *
     * @return Number
     */
    age(): number;
    _ageValue(): number;
    /**
     * Value of applicable max-age (or heuristic equivalent) in seconds. This counts since response's `Date`.
     *
     * For an up-to-date value, see `timeToLive()`.
     *
     * @return Number
     */
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
    /**
     * Headers for sending to the origin server to revalidate stale response.
     * Allows server to return 304 to allow reuse of the previous response.
     *
     * Hop by hop headers are always stripped.
     * Revalidation headers may be added or removed, depending on request.
     */
    revalidationHeaders(incomingReq: any): {
        warning: any;
    };
    /**
     * Creates new CachePolicy with information combined from the previews response,
     * and the new revalidation response.
     *
     * Returns {policy, modified} where modified is a boolean indicating
     * whether the response body has been modified, and old cached body can't be used.
     *
     * @return {Object} {policy: CachePolicy, modified: Boolean}
     */
    revalidatedPolicy(request: any, response: any): any;
}
