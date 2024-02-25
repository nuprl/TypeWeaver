declare namespace _default {
    export { stringify };
    export { stripBom };
}
export default _default;
declare function stringify(obj: any, { EOL, finalEOL, replacer, spaces }?: {
    EOL?: string;
    finalEOL?: boolean;
    replacer?: any;
    spaces: any;
}): string;
declare function stripBom(content: any): any;
