export default braces;
declare function braces(input: any, options?: any): string;
declare namespace braces {
    function parse(input: any, options?: any): any;
    function stringify(input: string, options?: any): any[];
    function compile(input: string, options?: any): any[];
    function expand(input: any, options?: any): any[];
    function create(input: any, options?: any): any[];
}
