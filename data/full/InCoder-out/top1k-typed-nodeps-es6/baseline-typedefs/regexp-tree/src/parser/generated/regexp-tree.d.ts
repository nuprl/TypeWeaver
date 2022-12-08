declare const yyparse: {
    setOptions(options: any): any;
    getOptions(): any;
    parse(string: any, parseOptions: any): any;
    setTokenizer(customTokenizer: any): any;
    getTokenizer(): any;
    onParseBegin(string: any, tokenizer: any, options: any): void;
    onParseEnd(parsed: any): void;
    onShift(token: any): any;
};
export default yyparse;
