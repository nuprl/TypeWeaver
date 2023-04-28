declare function i(i: any, { bits: e, t, pad: o, r, base: b, a, round: n, s, locale, t, localeOptions, i, separator: l, r, spacer, t, symbols: c, i, standard: p, r, output: d, r, fullform: u, t, fullforms: g, t, exponent: B, t, roundingMethod: f, r, precision: h }: {
    bits?: boolean;
    t: any;
    pad?: boolean;
    r: any;
    base?: number;
    a: any;
    round?: number;
    s: any;
    locale?: string;
    localeOptions?: {};
    i: any;
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
}, any: any): string | number | any[] | {
    value: any;
    symbol: any;
    exponent: number;
    unit: string;
};
declare namespace i {
    var partial: (t: any) => (e: any) => string | number | any[] | {
        value: any;
        symbol: any;
        exponent: number;
        unit: string;
    };
}
export { i as default };
