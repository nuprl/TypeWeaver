declare function wrap(text: string, options: {}, WrapOptions: any): any[];
declare function fill(text: string, options: {}, FillOptions: any): string;
declare function dedent(text: string): string;
declare const _default: {
    wrap: typeof wrap;
    fill: typeof fill;
    dedent: typeof dedent;
};
export default _default;
