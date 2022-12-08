declare var randomBytes: any;
declare var UID_LENGTH: number;
declare var UID: string;
declare var PLACE_HOLDER_REGEXP: RegExp;
declare var IS_NATIVE_CODE_REGEXP: RegExp;
declare var IS_PURE_FUNCTION: RegExp;
declare var IS_ARROW_FUNCTION: RegExp;
declare var UNSAFE_CHARS_REGEXP: RegExp;
declare var RESERVED_SYMBOLS: string[];
declare var ESCAPED_CHARS: {
    '<': string;
    '>': string;
    '/': string;
    '\u2028': string;
    '\u2029': string;
};
declare function escapeUnsafeChars(unsafeChar: string | number): any;
declare function generateUID(): string;
declare function deleteFunctions(obj: Object): void;
