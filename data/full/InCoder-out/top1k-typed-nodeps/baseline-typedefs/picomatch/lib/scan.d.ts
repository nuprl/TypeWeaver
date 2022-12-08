declare const utils: any;
declare const CHAR_ASTERISK: any, CHAR_AT: any, CHAR_BACKWARD_SLASH: any, CHAR_COMMA: any, CHAR_DOT: any, CHAR_EXCLAMATION_MARK: any, CHAR_FORWARD_SLASH: any, CHAR_LEFT_CURLY_BRACE: any, CHAR_LEFT_PARENTHESES: any, CHAR_LEFT_SQUARE_BRACKET: any, CHAR_PLUS: any, CHAR_QUESTION_MARK: any, CHAR_RIGHT_CURLY_BRACE: any, CHAR_RIGHT_PARENTHESES: any, CHAR_RIGHT_SQUARE_BRACKET: any;
declare const isPathSeparator: (code: any) => boolean;
declare const depth: (token: any) => void;
declare const scan: (input: any, options: any) => {
    prefix: string;
    input: any;
    start: number;
    base: any;
    glob: string;
    isBrace: boolean;
    isBracket: boolean;
    isGlob: boolean;
    isExtglob: boolean;
    isGlobstar: boolean;
    negated: boolean;
    negatedExtglob: boolean;
};
