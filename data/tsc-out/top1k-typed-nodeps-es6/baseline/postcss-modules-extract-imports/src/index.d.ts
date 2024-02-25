declare function _default(options?: {}): {
    postcssPlugin: string;
    prepare(): {
        Once(root: any, postcss: any): void;
    };
};
export default _default;
export const postcss: true;
