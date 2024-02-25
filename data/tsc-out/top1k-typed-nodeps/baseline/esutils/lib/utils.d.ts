export const ast: {
    isExpression: (node: any) => boolean;
    isStatement: (node: any) => boolean;
    isIterationStatement: (node: any) => boolean;
    isSourceElement: (node: any) => boolean;
    isProblematicIfStatement: (node: any) => boolean;
    trailingStatement: (node: any) => any;
};
export const code: {
    isDecimalDigit: (ch: any) => boolean;
    isHexDigit: (ch: any) => boolean;
    isOctalDigit: (ch: any) => boolean;
    isWhiteSpace: (ch: any) => boolean;
    isLineTerminator: (ch: any) => boolean;
    isIdentifierStartES5: (ch: any) => any;
    isIdentifierPartES5: (ch: any) => any;
    isIdentifierStartES6: (ch: any) => any;
    isIdentifierPartES6: (ch: any) => any;
};
export const keyword: {
    isKeywordES5: (id: any, strict: any) => boolean;
    isKeywordES6: (id: any, strict: any) => boolean;
    isReservedWordES5: (id: any, strict: any) => boolean;
    isReservedWordES6: (id: any, strict: any) => boolean;
    isRestrictedWord: (id: any) => boolean;
    isIdentifierNameES5: (id: any) => boolean;
    isIdentifierNameES6: (id: any) => boolean;
    isIdentifierES5: (id: any, strict: any) => boolean;
    isIdentifierES6: (id: any, strict: any) => boolean;
};
