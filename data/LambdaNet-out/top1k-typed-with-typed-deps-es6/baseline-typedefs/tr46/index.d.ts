declare function toASCII(domainName: string, { checkHyphens, checkBidi, checkJoiners, useSTD3ASCIIRules, processingOption, verifyDNSLength }?: {
    checkHyphens?: boolean;
    checkBidi?: boolean;
    checkJoiners?: boolean;
    useSTD3ASCIIRules?: boolean;
    processingOption?: string;
    verifyDNSLength?: boolean;
}): void;
declare function toUnicode(domainName: string, { checkHyphens, checkBidi, checkJoiners, useSTD3ASCIIRules, processingOption }?: {
    checkHyphens?: boolean;
    checkBidi?: boolean;
    checkJoiners?: boolean;
    useSTD3ASCIIRules?: boolean;
    processingOption?: string;
}): void;
declare const _default: {
    toASCII: typeof toASCII;
    toUnicode: typeof toUnicode;
};
export default _default;
