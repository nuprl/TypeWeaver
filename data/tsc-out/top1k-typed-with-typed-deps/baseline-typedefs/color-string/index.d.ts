export function get(string: any): any;
export namespace get {
    function rgb(string: any): number[];
    function hsl(string: any): number[];
    function hwb(string: any): number[];
}
export namespace to {
    function hex(...args: any[]): string;
    function rgb(...args: any[]): string;
    namespace rgb {
        function percent(...args: any[]): string;
    }
    function hsl(...args: any[]): string;
    function hwb(...args: any[]): string;
    function keyword(rgb: any): any;
}
export const to: {};
export const get: {};
