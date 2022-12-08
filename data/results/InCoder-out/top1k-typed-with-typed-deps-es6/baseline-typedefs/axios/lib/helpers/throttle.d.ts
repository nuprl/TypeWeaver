declare function throttle(fn: Function, freq: number): (force: number, args: any[]) => any;
export default throttle;
