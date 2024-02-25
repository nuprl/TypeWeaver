export = bytes;
declare function bytes(value: string | number, options?: {
    case: [string];
    decimalPlaces: [number];
    fixedDecimals: [boolean];
    thousandsSeparator: [string];
    unitSeparator: [string];
}): string | number | null;
declare namespace bytes {
    export { format, parse };
}
declare function format(value: number, options?: {
    decimalPlaces?: number;
    fixedDecimals?: number;
    thousandsSeparator?: string;
    unit?: string;
    unitSeparator?: string;
}): string | null;
declare function parse(val: number | string): number | null;
