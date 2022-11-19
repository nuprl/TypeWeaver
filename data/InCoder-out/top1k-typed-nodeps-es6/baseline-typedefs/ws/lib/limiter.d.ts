declare const kRun: unique symbol;
declare class Limiter {
    constructor(concurrency: any);
    add(job: any): void;
    [kRun](): void;
}
export default Limiter;
