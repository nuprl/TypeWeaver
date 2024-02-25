export = Color;
declare function Color(object: any, model: any): Color;
declare class Color {
    constructor(object: any, model: any);
    model: any;
    color: any;
    valpha: number;
    toString(): any;
    toJSON(): any;
    string(places: any): any;
    percentString(places: any): string;
    array(): any;
    object(): {
        alpha: number;
    };
    unitArray(): any;
    unitObject(): any;
    round(places: any): any;
    alpha(value: any): number | Color;
    red: (value: any) => any;
    green: (value: any) => any;
    blue: (value: any) => any;
    hue: (value: any) => any;
    saturationl: (value: any) => any;
    lightness: (value: any) => any;
    saturationv: (value: any) => any;
    value: (value: any) => any;
    chroma: (value: any) => any;
    gray: (value: any) => any;
    white: (value: any) => any;
    wblack: (value: any) => any;
    cyan: (value: any) => any;
    magenta: (value: any) => any;
    yellow: (value: any) => any;
    black: (value: any) => any;
    x: (value: any) => any;
    y: (value: any) => any;
    z: (value: any) => any;
    l: (value: any) => any;
    a: (value: any) => any;
    b: (value: any) => any;
    keyword(value: any): any;
    hex(value: any): string | Color;
    hexa(value: any): string | Color;
    rgbNumber(): number;
    luminosity(): number;
    contrast(color2: any): number;
    level(color2: any): "" | "AAA" | "AA";
    isDark(): boolean;
    isLight(): boolean;
    negate(): any;
    lighten(ratio: any): any;
    darken(ratio: any): any;
    saturate(ratio: any): any;
    desaturate(ratio: any): any;
    whiten(ratio: any): any;
    blacken(ratio: any): any;
    grayscale(): any;
    fade(ratio: any): number | Color;
    opaquer(ratio: any): number | Color;
    rotate(degrees: any): any;
    mix(mixinColor: any, weight: any): any;
}
