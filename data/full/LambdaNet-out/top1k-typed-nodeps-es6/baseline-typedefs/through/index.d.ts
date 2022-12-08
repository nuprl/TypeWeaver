export default through;
declare function through(write: Function, end: Function, opts: object): string;
declare namespace through {
    var through: typeof import(".").default;
}
