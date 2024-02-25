export default yyparse;
declare namespace yyparse {
    function onParseBegin(string: any, lexer: any): void;
    /**
     * On shifting `(` remember its number to used on reduce.
     */
    function onShift(token: any): any;
}
