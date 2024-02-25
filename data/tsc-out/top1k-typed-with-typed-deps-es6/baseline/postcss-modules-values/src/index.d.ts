declare function _default(options: any): {
    postcssPlugin: string;
    prepare(result: any): {
        Once(root: any, postcss: any): void;
    };
};
export default _default;
export const postcss: true;
