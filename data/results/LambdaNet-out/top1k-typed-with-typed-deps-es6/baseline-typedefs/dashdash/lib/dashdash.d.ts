declare function parseBool(option: string, optstr: any[], arg: boolean): boolean;
declare function parseString(option: string, optstr: any[], arg: string): string;
declare function parseNumber(option: number, optstr: number, arg: number): number;
declare function parseInteger(option: string, optstr: number, arg: number): number;
declare function parsePositiveInteger(option: string, optstr: number, arg: number): number;
declare function parseDate(option: string, optstr: string, arg: number): object;
declare function Parser(config: HTMLElement): void;
declare function bashCompletionSpecFromOptions(args: object): any[];
declare function bashCompletionFromOptions(args: object): boolean;
declare function createParser(config: string): string;
declare function parse(config_: object): void;
declare function addOptionType(optionType: object): void;
declare function getOptionType(name: string): string;
declare function synopsisFromOpt(o: object): string;
declare const _default: {
    createParser: typeof createParser;
    Parser: typeof Parser;
    parse: typeof parse;
    addOptionType: typeof addOptionType;
    getOptionType: typeof getOptionType;
    synopsisFromOpt: typeof synopsisFromOpt;
    BASH_COMPLETION_TEMPLATE_PATH: string;
    bashCompletionFromOptions: typeof bashCompletionFromOptions;
    bashCompletionSpecFromOptions: typeof bashCompletionSpecFromOptions;
    parseBool: typeof parseBool;
    parseString: typeof parseString;
    parseNumber: typeof parseNumber;
    parseInteger: typeof parseInteger;
    parsePositiveInteger: typeof parsePositiveInteger;
    parseDate: typeof parseDate;
};
export default _default;
