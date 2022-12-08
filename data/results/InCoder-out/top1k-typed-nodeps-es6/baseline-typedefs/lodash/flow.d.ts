declare function flow(...funcs: Array<Function>): (...args: any[]) => any;
export default flow;
