declare const replace: {
    (searchValue: string | RegExp, replaceValue: string): string;
    (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;
    (searchValue: {
        [Symbol.replace](string: string, replaceValue: string): string;
    }, replaceValue: string): string;
    (searchValue: {
        [Symbol.replace](string: string, replacer: (substring: string, ...args: any[]) => string): string;
    }, replacer: (substring: string, ...args: any[]) => string): string;
};
declare const es: RegExp;
declare const ca: RegExp;
declare const esca: {
    '&': string;
    '<': string;
    '>': string;
    "'": string;
    '"': string;
};
declare const pe: (m: any) => any;
declare const escape: (es: any) => any;
declare const unes: {
    '&amp;': string;
    '&#38;': string;
    '&lt;': string;
    '&#60;': string;
    '&gt;': string;
    '&#62;': string;
    '&apos;': string;
    '&#39;': string;
    '&quot;': string;
    '&#34;': string;
};
declare const cape: (m: any) => any;
declare const unescape: (un: any) => any;
