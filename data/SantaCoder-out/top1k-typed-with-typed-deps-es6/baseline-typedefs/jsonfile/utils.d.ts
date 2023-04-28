declare function stringify(obj: any, { EOL, string, finalEOL, boolean, replacer, any, spaces }: {
    EOL?: string;
    string: any;
    finalEOL?: boolean;
    boolean: any;
    replacer?: any;
    any: any;
    spaces: any;
}, any: any): string;
declare function stripBom(content: string): string;
declare const _default: {
    stringify: typeof stringify;
    stripBom: typeof stripBom;
};
export default _default;
