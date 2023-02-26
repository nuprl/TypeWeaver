declare function throttle(fn: Function, freq: number): (force: boolean, args: any[]) => any;
export default throttle;
