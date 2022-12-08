declare const _default: ({
    input: string;
    output: {
        file: any;
        format: string;
        name?: undefined;
    };
    external: (id: any) => boolean;
    plugins: any[];
} | {
    input: string;
    output: {
        file: string;
        format: string;
        name: any;
    };
    plugins: any[];
    external?: undefined;
})[];
export default _default;
