declare namespace _default {
    export { createParser };
    export { Parser };
    export { parse };
    export { addOptionType };
    export { getOptionType };
    export { synopsisFromOpt };
    export { BASH_COMPLETION_TEMPLATE_PATH };
    export { bashCompletionFromOptions };
    export { bashCompletionSpecFromOptions };
    export { parseBool };
    export { parseString };
    export { parseNumber };
    export { parseInteger };
    export { parsePositiveInteger };
    export { parseDate };
}
export default _default;
declare function createParser(config: any): Parser;
declare function Parser(config: any): void;
declare class Parser {
    constructor(config: any);
    interspersed: any;
    allowUnknown: any;
    options: any;
    optionFromName: {};
    optionFromEnv: {};
    optionTakesArg(option: any): any;
    parse(inputs: any, ...args: any[]): any;
    help(config: any): string;
    bashCompletion(args: any): any;
}
declare function parse(config_: any): any;
declare function addOptionType(optionType: any): void;
declare function getOptionType(name: any): any;
declare function synopsisFromOpt(o: any): string;
declare const BASH_COMPLETION_TEMPLATE_PATH: string;
declare function bashCompletionFromOptions(args: any): any;
declare function bashCompletionSpecFromOptions(args: any): string;
declare function parseBool(option: any, optstr: any, arg: any): boolean;
declare function parseString(option: any, optstr: any, arg: any): any;
declare function parseNumber(option: any, optstr: any, arg: any): number;
declare function parseInteger(option: any, optstr: any, arg: any): number;
declare function parsePositiveInteger(option: any, optstr: any, arg: any): number;
declare function parseDate(option: any, optstr: any, arg: any): Date;
