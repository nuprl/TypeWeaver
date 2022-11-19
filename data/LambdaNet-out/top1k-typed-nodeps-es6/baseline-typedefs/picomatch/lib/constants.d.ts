declare const _default: {
    MAX_LENGTH: number;
    POSIX_REGEX_SOURCE: object;
    REGEX_BACKSLASH: RegExp;
    REGEX_NON_SPECIAL_CHARS: RegExp;
    REGEX_SPECIAL_CHARS: RegExp;
    REGEX_SPECIAL_CHARS_BACKREF: RegExp;
    REGEX_SPECIAL_CHARS_GLOBAL: RegExp;
    REGEX_REMOVE_BACKSLASH: RegExp;
    REPLACEMENTS: {
        '***': string;
        '**/**': string;
        '**/**/**': string;
    };
    CHAR_0: number;
    CHAR_9: number;
    CHAR_UPPERCASE_A: number;
    CHAR_LOWERCASE_A: number;
    CHAR_UPPERCASE_Z: number;
    CHAR_LOWERCASE_Z: number;
    CHAR_LEFT_PARENTHESES: number;
    CHAR_RIGHT_PARENTHESES: number;
    CHAR_ASTERISK: number;
    CHAR_AMPERSAND: number;
    CHAR_AT: number;
    CHAR_BACKWARD_SLASH: number;
    CHAR_CARRIAGE_RETURN: number;
    CHAR_CIRCUMFLEX_ACCENT: number;
    CHAR_COLON: number;
    CHAR_COMMA: number;
    CHAR_DOT: number;
    CHAR_DOUBLE_QUOTE: number;
    CHAR_EQUAL: number;
    CHAR_EXCLAMATION_MARK: number;
    CHAR_FORM_FEED: number;
    CHAR_FORWARD_SLASH: number;
    CHAR_GRAVE_ACCENT: number;
    CHAR_HASH: number;
    CHAR_HYPHEN_MINUS: number;
    CHAR_LEFT_ANGLE_BRACKET: number;
    CHAR_LEFT_CURLY_BRACE: number;
    CHAR_LEFT_SQUARE_BRACKET: number;
    CHAR_LINE_FEED: number;
    CHAR_NO_BREAK_SPACE: number;
    CHAR_PERCENT: number;
    CHAR_PLUS: number;
    CHAR_QUESTION_MARK: number;
    CHAR_RIGHT_ANGLE_BRACKET: number;
    CHAR_RIGHT_CURLY_BRACE: number;
    CHAR_RIGHT_SQUARE_BRACKET: number;
    CHAR_SEMICOLON: number;
    CHAR_SINGLE_QUOTE: number;
    CHAR_SPACE: number;
    CHAR_TAB: number;
    CHAR_UNDERSCORE: number;
    CHAR_VERTICAL_LINE: number;
    CHAR_ZERO_WIDTH_NOBREAK_SPACE: number;
    SEP: "\\" | "/";
    extglobChars(chars: any): {
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
    globChars(win32: any): object;
};
export default _default;
