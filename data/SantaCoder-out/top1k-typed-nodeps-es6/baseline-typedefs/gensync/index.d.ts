declare const _default: ((optsOrFn: GeneratorFunction) => GeneratorFunction & {
    sync: (...args: any[]) => any;
    async: (...args: any[]) => Promise<unknown>;
    errback: (...args: any[]) => void;
}) & {
    all: Function;
    race: Function;
};
export default _default;
