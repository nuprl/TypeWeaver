export default yyparse;
declare namespace yyparse {
    function onParseBegin(string: any, lexer: any): void;
    function onShift(token: any): any;
}
