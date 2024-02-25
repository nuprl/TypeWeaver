declare namespace _default {
    export const MAX_LENGTH: number;
    export { POSIX_REGEX_SOURCE };
    export const REGEX_BACKSLASH: RegExp;
    export const REGEX_NON_SPECIAL_CHARS: RegExp;
    export const REGEX_SPECIAL_CHARS: RegExp;
    export const REGEX_SPECIAL_CHARS_BACKREF: RegExp;
    export const REGEX_SPECIAL_CHARS_GLOBAL: RegExp;
    export const REGEX_REMOVE_BACKSLASH: RegExp;
    export const REPLACEMENTS: {
        '***': string;
        '**/**': string;
        '**/**/**': string;
    };
    export const CHAR_0: number;
    export const CHAR_9: number;
    export const CHAR_UPPERCASE_A: number;
    export const CHAR_LOWERCASE_A: number;
    export const CHAR_UPPERCASE_Z: number;
    export const CHAR_LOWERCASE_Z: number;
    export const CHAR_LEFT_PARENTHESES: number;
    export const CHAR_RIGHT_PARENTHESES: number;
    export const CHAR_ASTERISK: number;
    export const CHAR_AMPERSAND: number;
    export const CHAR_AT: number;
    export const CHAR_BACKWARD_SLASH: number;
    export const CHAR_CARRIAGE_RETURN: number;
    export const CHAR_CIRCUMFLEX_ACCENT: number;
    export const CHAR_COLON: number;
    export const CHAR_COMMA: number;
    export const CHAR_DOT: number;
    export const CHAR_DOUBLE_QUOTE: number;
    export const CHAR_EQUAL: number;
    export const CHAR_EXCLAMATION_MARK: number;
    export const CHAR_FORM_FEED: number;
    export const CHAR_FORWARD_SLASH: number;
    export const CHAR_GRAVE_ACCENT: number;
    export const CHAR_HASH: number;
    export const CHAR_HYPHEN_MINUS: number;
    export const CHAR_LEFT_ANGLE_BRACKET: number;
    export const CHAR_LEFT_CURLY_BRACE: number;
    export const CHAR_LEFT_SQUARE_BRACKET: number;
    export const CHAR_LINE_FEED: number;
    export const CHAR_NO_BREAK_SPACE: number;
    export const CHAR_PERCENT: number;
    export const CHAR_PLUS: number;
    export const CHAR_QUESTION_MARK: number;
    export const CHAR_RIGHT_ANGLE_BRACKET: number;
    export const CHAR_RIGHT_CURLY_BRACE: number;
    export const CHAR_RIGHT_SQUARE_BRACKET: number;
    export const CHAR_SEMICOLON: number;
    export const CHAR_SINGLE_QUOTE: number;
    export const CHAR_SPACE: number;
    export const CHAR_TAB: number;
    export const CHAR_UNDERSCORE: number;
    export const CHAR_VERTICAL_LINE: number;
    export const CHAR_ZERO_WIDTH_NOBREAK_SPACE: number;
    export const SEP: "\\" | "/";
    /**
     * Create EXTGLOB_CHARS
     */
    export function extglobChars(chars: any): {
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
    export function globChars(win32: any): {
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
}
export default _default;
declare namespace POSIX_REGEX_SOURCE {
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
