declare const _default: ({
    name: string;
    args: number[][];
    setup(num: any): void;
    fn(async: any, done: any): void;
} | {
    name: string;
    fn(async: any, done: any): void;
    args?: undefined;
})[];
export default _default;
