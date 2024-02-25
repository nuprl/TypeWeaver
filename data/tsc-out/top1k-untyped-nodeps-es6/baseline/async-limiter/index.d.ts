export default Queue;
declare function Queue(options: any): Queue;
declare class Queue {
    constructor(options: any);
    concurrency: any;
    pending: number;
    jobs: any[];
    onDoneCbs: any[];
    _done: any;
    _run: any;
    get length(): number;
    onDone(cb: any): void;
}
