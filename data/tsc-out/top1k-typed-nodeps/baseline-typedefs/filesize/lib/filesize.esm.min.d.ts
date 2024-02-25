export { i as default };
declare function i(i: any, { bits: e, pad: o, base: b, round: n, locale: r, localeOptions: a, separator: l, spacer: s, symbols: c, standard: p, output: d, fullform: u, fullforms: g, exponent: B, roundingMethod: f, precision: h }?: {
    bits?: boolean;
    pad?: boolean;
    base?: number;
    round?: number;
    locale?: string;
    localeOptions?: {};
    separator?: string;
    spacer?: string;
    symbols?: {};
    standard?: string;
    output?: string;
    fullform?: boolean;
    fullforms?: any[];
    exponent?: number;
    roundingMethod?: string;
    precision?: number;
}): string | number | any[] | {
    value: any;
    symbol: any;
    exponent: number;
    unit: string;
};
declare namespace i {
    function partial(t: any): (e: any) => string | number | any[] | {
        value: any;
        symbol: any;
        exponent: number;
        unit: string;
    };
}
