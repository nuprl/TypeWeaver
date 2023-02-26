declare function toASCII(domainName: any, { checkHyphens, checkBidi, checkJoiners, useSTD3ASCIIRules, processingOption, verifyDNSLength }?: {
    checkHyphens?: boolean;
    checkBidi?: boolean;
    checkJoiners?: boolean;
    useSTD3ASCIIRules?: boolean;
    processingOption?: string;
    verifyDNSLength?: boolean;
}): string;
declare function toUnicode(domainName: any, { checkHyphens, checkBidi, checkJoiners, useSTD3ASCIIRules, processingOption }?: {
    checkHyphens?: boolean;
    checkBidi?: boolean;
    checkJoiners?: boolean;
    useSTD3ASCIIRules?: boolean;
    processingOption?: string;
}): {
    domain: string;
    error: boolean;
};
declare const _default: {
    toASCII: typeof toASCII;
    toUnicode: typeof toUnicode;
};
export default _default;
