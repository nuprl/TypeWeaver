declare namespace _default {
    const input: string;
    const output: ({
        format: string;
        file: string;
        name: string;
    } | {
        format: string;
        file: string;
        name?: undefined;
    })[];
}
export default _default;
