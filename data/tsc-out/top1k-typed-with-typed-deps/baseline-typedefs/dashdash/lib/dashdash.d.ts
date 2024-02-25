export function createParser(config: any): Parser;
export function Parser(config: any): void;
export class Parser {
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
export function parse(config_: any): any;
export function addOptionType(optionType: any): void;
export function getOptionType(name: any): any;
export function synopsisFromOpt(o: any): string;
export const BASH_COMPLETION_TEMPLATE_PATH: string;
export function bashCompletionFromOptions(args: any): any;
export function bashCompletionSpecFromOptions(args: any): string;
export function parseBool(option: any, optstr: any, arg: any): boolean;
export function parseString(option: any, optstr: any, arg: any): any;
export function parseNumber(option: any, optstr: any, arg: any): number;
export function parseInteger(option: any, optstr: any, arg: any): number;
export function parsePositiveInteger(option: any, optstr: any, arg: any): number;
export function parseDate(option: any, optstr: any, arg: any): Date;
