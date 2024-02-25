export = status;
declare function status(code: string | number): number;
declare namespace status {
    export { codes as message };
    export const code: {};
    const codes_1: number[];
    export { codes_1 as codes };
    export const redirect: {
        300: boolean;
        301: boolean;
        302: boolean;
        303: boolean;
        305: boolean;
        307: boolean;
        308: boolean;
    };
    export const empty: {
        204: boolean;
        205: boolean;
        304: boolean;
    };
    export const retry: {
        502: boolean;
        503: boolean;
        504: boolean;
    };
}
