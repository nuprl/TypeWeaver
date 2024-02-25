declare function _exports(options: any): {
    postcssPlugin: string;
    prepare(result: any): {
        Once(root: any, postcss: any): void;
    };
};
declare namespace _exports {
    const postcss: true;
}
export = _exports;
