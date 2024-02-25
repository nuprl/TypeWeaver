export = Limiter;
/**
 * A very simple job queue with adjustable concurrency. Adapted from
 * https://github.com/STRML/async-limiter
 */
declare class Limiter {
    /**
     * Creates a new `Limiter`.
     *
     * @param {Number} [concurrency=Infinity] The maximum number of jobs allowed
     *     to run concurrently
     */
    constructor(concurrency?: number);
    concurrency: number;
    jobs: any[];
    pending: number;
    /**
     * Adds a job to the queue.
     *
     * @param {Function} job The job to run
     * @public
     */
    public add(job: Function): void;
    /**
     * Removes a job from the queue and runs it if possible.
     *
     * @private
     */
    private [kRun];
    [kDone]: () => void;
}
declare const kRun: unique symbol;
declare const kDone: unique symbol;
