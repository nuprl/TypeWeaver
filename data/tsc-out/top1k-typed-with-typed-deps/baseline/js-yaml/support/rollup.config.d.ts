declare const _default: ({
    input: string;
    output: ({
        file: string;
        format: string;
        name: string;
        exports: string;
    } | {
        file: string;
        plugins: any[];
        format: string;
        name: string;
        exports: string;
    })[];
    plugins: any[];
} | {
    input: string;
    output: {
        format: string;
        file: string;
    }[];
    plugins: any[];
})[];
export default _default;
