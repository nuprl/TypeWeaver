export default function (options: any): (Parser: any) => {
    new (): {
        [x: string]: any;
        jsx_readToken(): any;
        jsx_readNewLine(normalizeCRLF: any): any;
        jsx_readString(quote: any): any;
        jsx_readEntity(): any;
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
    };
    [x: string]: any;
    readonly acornJsx: any;
};
