declare function i(i: any, { bits: e, t, pad: o, r, base: b, a, round: n, s, locale, t, localeOptions, i, separator: l, t, spacer, r, symbols: c, a, standard: p, t, output: d, t, fullform: u, void, fullforms: g, void, exponent: B, void, roundingMethod: f, void, precision: h }: {
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
    void: any;
    fullforms?: any[];
    exponent?: number;
    roundingMethod?: string;
    precision?: number;
}, : any): string | number | any[] | {
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
