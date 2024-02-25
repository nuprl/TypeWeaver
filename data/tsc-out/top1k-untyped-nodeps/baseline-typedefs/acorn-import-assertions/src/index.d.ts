export function importAssertions(Parser: any): {
    new (...args: any[]): {
        [x: string]: any;
        assertToken: any;
        _codeAt(i: any): any;
        _eat(t: any): void;
        readToken(code: any): any;
        parseDynamicImport(node: any): any;
        parseExport(node: any, exports: any): any;
        parseImport(node: any): any;
        parseImportAssertions(): any[];
        parseAssertEntries(): any[];
    };
    [x: string]: any;
};
