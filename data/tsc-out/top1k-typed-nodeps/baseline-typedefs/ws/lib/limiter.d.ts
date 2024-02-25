export = Limiter;
declare class Limiter {
    constructor(concurrency?: number);
    concurrency: number;
    jobs: any[];
    pending: number;
    public add(job: Function): void;
    private [kRun];
    [kDone]: () => void;
}
declare const kRun: unique symbol;
declare const kDone: unique symbol;
