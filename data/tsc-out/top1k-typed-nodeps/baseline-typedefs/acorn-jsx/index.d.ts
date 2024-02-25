declare function _exports(options: any): (Parser: any) => {
    new (): {
        [x: string]: any;
        jsx_readToken(): any;
        jsx_readNewLine(normalizeCRLF: any): string;
        lineStart: any;
        jsx_readString(quote: any): any;
        jsx_readEntity(): any;
        pos: any;
        jsx_readWord(): any;
        jsx_parseIdentifier(): any;
        jsx_parseNamespacedName(): any;
        jsx_parseElementName(): any;
        jsx_parseAttributeValue(): any;
        jsx_parseEmptyExpression(): any;
        jsx_parseExpressionContainer(): any;
        jsx_parseAttribute(): any;
        jsx_parseOpeningElementAt(startPos: any, startLoc: any): any;
        jsx_parseClosingElementAt(startPos: any, startLoc: any): any;
        jsx_parseElementAt(startPos: any, startLoc: any): any;
        jsx_parseText(): any;
        jsx_parseElement(): any;
        parseExprAtom(refShortHandDefaultPos: any): any;
        readToken(code: any): any;
        updateContext(prevType: any): any;
        exprAllowed: boolean;
    };
    [x: string]: any;
    readonly acornJsx: any;
};
declare namespace _exports {
    const tokTypes: any;
}
export = _exports;
