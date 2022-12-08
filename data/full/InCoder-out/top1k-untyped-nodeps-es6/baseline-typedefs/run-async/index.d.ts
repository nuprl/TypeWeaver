declare var runAsync: (func: Function, cb: Function) => () => Promise<unknown>;
export default runAsync;
