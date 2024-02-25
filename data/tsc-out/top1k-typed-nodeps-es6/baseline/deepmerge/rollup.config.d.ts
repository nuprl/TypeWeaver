declare namespace _default {
    const input: string;
    const plugins: any[];
    const output: ({
        file: any;
        format: string;
        name?: undefined;
    } | {
        name: string;
        file: string;
        format: string;
    })[];
}
export default _default;
