declare const stringify: any;
declare const MAX_LENGTH: any, CHAR_BACKSLASH: any, CHAR_BACKTICK: any, CHAR_COMMA: any, CHAR_DOT: any, CHAR_LEFT_PARENTHESES: any, CHAR_RIGHT_PARENTHESES: any, CHAR_LEFT_CURLY_BRACE: any, CHAR_RIGHT_CURLY_BRACE: any, CHAR_LEFT_SQUARE_BRACKET: any, CHAR_RIGHT_SQUARE_BRACKET: any, CHAR_DOUBLE_QUOTE: any, CHAR_SINGLE_QUOTE: any, CHAR_NO_BREAK_SPACE: any, CHAR_ZERO_WIDTH_NOBREAK_SPACE: any;
declare const parse: (input: any, options?: {}) => {
    type: string;
    input: string;
    nodes: any[];
};
