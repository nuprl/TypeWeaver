declare function _exports(options?: {}): {
    postcssPlugin: string;
    prepare(): {
        Once(root: any, postcss: any): void;
    };
};
declare namespace _exports {
    const postcss: true;
}
export = _exports;
