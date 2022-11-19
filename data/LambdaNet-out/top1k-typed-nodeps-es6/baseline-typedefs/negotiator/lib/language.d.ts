declare var simpleLanguageRegExp: RegExp;
declare function parseAcceptLanguage(accept: string): any[];
declare function parseLanguage(str: string, i: number): object;
declare function getLanguagePriority(language: string, accepted: any[], index: number): object;
declare function preferredLanguages(accept: number, provided: any[]): any[];
declare function getFullLanguage(spec: object): boolean;
