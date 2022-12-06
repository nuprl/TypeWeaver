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
declare const esca: object;
declare const pe: Function;
declare const escape: Function;
declare const unes: object;
declare const cape: Function;
declare const unescape: Function;
