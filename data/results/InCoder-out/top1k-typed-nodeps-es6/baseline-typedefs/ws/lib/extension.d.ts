/// <reference types="node" />
declare function parse(header: Buffer): any;
declare function format(extensions: Record<string, any>): string;
declare const _default: {
    format: typeof format;
    parse: typeof parse;
};
export default _default;
