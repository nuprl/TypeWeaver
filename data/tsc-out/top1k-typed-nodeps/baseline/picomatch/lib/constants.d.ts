export namespace POSIX_REGEX_SOURCE {
    const alnum: string;
    const alpha: string;
    const ascii: string;
    const blank: string;
    const cntrl: string;
    const digit: string;
    const graph: string;
    const lower: string;
    const print: string;
    const punct: string;
    const space: string;
    const upper: string;
    const word: string;
    const xdigit: string;
}
export declare const MAX_LENGTH: number;
export declare const REGEX_BACKSLASH: RegExp;
export declare const REGEX_NON_SPECIAL_CHARS: RegExp;
export declare const REGEX_SPECIAL_CHARS: RegExp;
export declare const REGEX_SPECIAL_CHARS_BACKREF: RegExp;
export declare const REGEX_SPECIAL_CHARS_GLOBAL: RegExp;
export declare const REGEX_REMOVE_BACKSLASH: RegExp;
export declare const REPLACEMENTS: {
    '***': string;
    '**/**': string;
    '**/**/**': string;
};
export declare const CHAR_0: number;
export declare const CHAR_9: number;
export declare const CHAR_UPPERCASE_A: number;
export declare const CHAR_LOWERCASE_A: number;
export declare const CHAR_UPPERCASE_Z: number;
export declare const CHAR_LOWERCASE_Z: number;
export declare const CHAR_LEFT_PARENTHESES: number;
export declare const CHAR_RIGHT_PARENTHESES: number;
export declare const CHAR_ASTERISK: number;
export declare const CHAR_AMPERSAND: number;
export declare const CHAR_AT: number;
export declare const CHAR_BACKWARD_SLASH: number;
export declare const CHAR_CARRIAGE_RETURN: number;
export declare const CHAR_CIRCUMFLEX_ACCENT: number;
export declare const CHAR_COLON: number;
export declare const CHAR_COMMA: number;
export declare const CHAR_DOT: number;
export declare const CHAR_DOUBLE_QUOTE: number;
export declare const CHAR_EQUAL: number;
export declare const CHAR_EXCLAMATION_MARK: number;
export declare const CHAR_FORM_FEED: number;
export declare const CHAR_FORWARD_SLASH: number;
export declare const CHAR_GRAVE_ACCENT: number;
export declare const CHAR_HASH: number;
export declare const CHAR_HYPHEN_MINUS: number;
export declare const CHAR_LEFT_ANGLE_BRACKET: number;
export declare const CHAR_LEFT_CURLY_BRACE: number;
export declare const CHAR_LEFT_SQUARE_BRACKET: number;
export declare const CHAR_LINE_FEED: number;
export declare const CHAR_NO_BREAK_SPACE: number;
export declare const CHAR_PERCENT: number;
export declare const CHAR_PLUS: number;
export declare const CHAR_QUESTION_MARK: number;
export declare const CHAR_RIGHT_ANGLE_BRACKET: number;
export declare const CHAR_RIGHT_CURLY_BRACE: number;
export declare const CHAR_RIGHT_SQUARE_BRACKET: number;
export declare const CHAR_SEMICOLON: number;
export declare const CHAR_SINGLE_QUOTE: number;
export declare const CHAR_SPACE: number;
export declare const CHAR_TAB: number;
export declare const CHAR_UNDERSCORE: number;
export declare const CHAR_VERTICAL_LINE: number;
export declare const CHAR_ZERO_WIDTH_NOBREAK_SPACE: number;
export declare const SEP: "\\" | "/";
/**
 * Create EXTGLOB_CHARS
 */
export declare function extglobChars(chars: any): {
    '!': {
        type: string;
        open: string;
        close: string;
    };
    '?': {
        type: string;
        open: string;
        close: string;
    };
    '+': {
        type: string;
        open: string;
        close: string;
    };
    '*': {
        type: string;
        open: string;
        close: string;
    };
    '@': {
        type: string;
        open: string;
        close: string;
    };
};
/**
 * Create GLOB_CHARS
 */
export declare function globChars(win32: any): {
    DOT_LITERAL: string;
    PLUS_LITERAL: string;
    QMARK_LITERAL: string;
    SLASH_LITERAL: string;
    ONE_CHAR: string;
    QMARK: string;
    END_ANCHOR: string;
    DOTS_SLASH: string;
    NO_DOT: string;
    NO_DOTS: string;
    NO_DOT_SLASH: string;
    NO_DOTS_SLASH: string;
    QMARK_NO_DOT: string;
    STAR: string;
    START_ANCHOR: string;
};
