declare var simpleLanguageRegExp: RegExp;
declare function parseAcceptLanguage(accept: string): string;
declare function parseLanguage(str: string, i: number): string;
declare function getLanguagePriority(language: string, accepted: any, index: number): any;
declare function preferredLanguages(accept: string, provided: string): boolean;
declare function getFullLanguage(spec: any): string;
