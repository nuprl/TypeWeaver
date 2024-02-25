export = Emitter;
/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */
declare function Emitter(obj: any): any;
declare class Emitter {
    /**
     * Initialize a new `Emitter`.
     *
     * @api public
     */
    constructor(obj: any);
    /**
     * Listen on the given `event` with `fn`.
     *
     * @param {String} event
     * @param {Function} fn
     * @return {Emitter}
     * @api public
     */
    on: (event: string, fn: Function) => Emitter;
    addEventListener(event: string, fn: Function): Emitter;
    _callbacks: any;
    /**
     * Adds an `event` listener that will be invoked a single
     * time then automatically removed.
     *
     * @param {String} event
     * @param {Function} fn
     * @return {Emitter}
     * @api public
     */
    once(event: string, fn: Function): Emitter;
    /**
     * Remove the given callback for `event` or all
     * registered callbacks.
     *
     * @param {String} event
     * @param {Function} fn
     * @return {Emitter}
     * @api public
     */
    off: (event: string, fn: Function, ...args: any[]) => Emitter;
    removeListener: (event: string, fn: Function, ...args: any[]) => Emitter;
    removeAllListeners: (event: string, fn: Function, ...args: any[]) => Emitter;
    removeEventListener(event: string, fn: Function, ...args: any[]): Emitter;
    /**
     * Emit `event` with the given args.
     *
     * @param {String} event
     * @param {Mixed} ...
     * @return {Emitter}
     */
    emit(event: string, ...args: any[]): Emitter;
    /**
     * Return array of callbacks for `event`.
     *
     * @param {String} event
     * @return {Array}
     * @api public
     */
    listeners(event: string): any[];
    /**
     * Check if this emitter has `event` handlers.
     *
     * @param {String} event
     * @return {Boolean}
     * @api public
     */
    hasListeners(event: string): boolean;
}
