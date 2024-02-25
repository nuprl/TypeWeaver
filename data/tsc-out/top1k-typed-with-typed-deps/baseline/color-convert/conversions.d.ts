export namespace rgb {
    function hsl(rgb: any): number[];
    function hsv(rgb: any): number[];
    function hwb(rgb: any): any[];
    function cmyk(rgb: any): number[];
    function keyword(rgb: any): any;
    function xyz(rgb: any): number[];
    function lab(rgb: any): number[];
    function ansi16(args: any, saturation?: any): number;
    function ansi256(args: any): number;
    function hex(args: any): string;
    function hcg(rgb: any): number[];
    function apple(rgb: any): number[];
    function gray(rgb: any): number[];
}
export namespace keyword {
    function rgb(keyword: any): any;
}
export namespace hsl {
    function rgb(hsl: any): number[];
    function hsv(hsl: any): any[];
    function hcg(hsl: any): any[];
}
export namespace hsv {
    function rgb(hsv: any): number[];
    function hsl(hsv: any): any[];
    function ansi16(args: any): any;
    function hcg(hsv: any): any[];
}
export namespace hwb {
    function rgb(hwb: any): number[];
    function hcg(hwb: any): any[];
}
export namespace cmyk {
    function rgb(cmyk: any): number[];
}
export namespace xyz {
    function rgb(xyz: any): number[];
    function lab(xyz: any): number[];
}
export namespace lab {
    function xyz(lab: any): number[];
    function lch(lab: any): any[];
}
export namespace lch {
    function lab(lch: any): any[];
}
export namespace ansi16 {
    function rgb(args: any): number[];
}
export namespace ansi256 {
    function rgb(args: any): number[];
}
export namespace hex {
    function rgb(args: any): number[];
}
export namespace hcg {
    function rgb(hcg: any): number[];
    function hsv(hcg: any): any[];
    function hsl(hcg: any): any[];
    function hwb(hcg: any): any[];
}
export namespace apple {
    function rgb(apple: any): number[];
}
export namespace gray {
    export function rgb(args: any): number[];
    export function hsl(args: any): any[];
    import hsv = hsl;
    export { hsv };
    export function hwb(gray: any): any[];
    export function cmyk(gray: any): any[];
    export function lab(gray: any): any[];
    export function hex(gray: any): string;
}
