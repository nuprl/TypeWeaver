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
declare const es: string;
declare const ca: string;
declare const esca: any;
declare const pe: any;
declare const escape: string;
declare const unes: any;
declare const cape: any;
declare const unescape: any;
