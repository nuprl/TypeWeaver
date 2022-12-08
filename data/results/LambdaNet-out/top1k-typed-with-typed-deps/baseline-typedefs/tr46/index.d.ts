declare const punycode: string;
declare const regexes: any[];
declare const mappingTable: string;
declare const STATUS_MAPPING: any;
declare function containsNonASCII(str: string): boolean;
declare function findStatus(val: Function, { useSTD3ASCIIRules }: {
    useSTD3ASCIIRules: any;
}): void;
declare function mapChars(domainName: string, { useSTD3ASCIIRules, processingOption }: {
    useSTD3ASCIIRules: any;
    processingOption: any;
}): void;
declare function validateLabel(label: string, { checkHyphens, checkBidi, checkJoiners, processingOption, useSTD3ASCIIRules }: {
    checkHyphens: any;
    checkBidi: any;
    checkJoiners: any;
    processingOption: any;
    useSTD3ASCIIRules: any;
}): void;
declare function isBidiDomain(labels: any[]): boolean;
declare function processing(domainName: string, options: object): object;
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
