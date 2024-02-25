export = EventEmitter;
/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
declare function EventEmitter(): void;
declare class EventEmitter {
    _events: Events;
    _eventsCount: number;
    /**
     * Return an array listing the events for which the emitter has registered
     * listeners.
     *
     * @returns {Array}
     * @public
     */
    public eventNames(): any[];
    /**
     * Return the listeners registered for a given event.
     *
     * @param {(String|Symbol)} event The event name.
     * @returns {Array} The registered listeners.
     * @public
     */
    public listeners(event: (string | Symbol)): any[];
    /**
     * Return the number of listeners listening to a given event.
     *
     * @param {(String|Symbol)} event The event name.
     * @returns {Number} The number of listeners.
     * @public
     */
    public listenerCount(event: (string | Symbol)): number;
    /**
     * Calls each of the listeners registered for a given event.
     *
     * @param {(String|Symbol)} event The event name.
     * @returns {Boolean} `true` if the event had listeners, else `false`.
     * @public
     */
    public emit(event: (string | Symbol), a1: any, a2: any, a3: any, a4: any, a5: any, ...args: any[]): boolean;
    /**
     * Add a listener for a given event.
     *
     * @param {(String|Symbol)} event The event name.
     * @param {Function} fn The listener function.
     * @param {*} [context=this] The context to invoke the listener with.
     * @returns {EventEmitter} `this`.
     * @public
     */
    public on(event: (string | Symbol), fn: Function, context?: any): EventEmitter;
    /**
     * Add a one-time listener for a given event.
     *
     * @param {(String|Symbol)} event The event name.
     * @param {Function} fn The listener function.
     * @param {*} [context=this] The context to invoke the listener with.
     * @returns {EventEmitter} `this`.
     * @public
     */
    public once(event: (string | Symbol), fn: Function, context?: any): EventEmitter;
    /**
     * Remove the listeners of a given event.
     *
     * @param {(String|Symbol)} event The event name.
     * @param {Function} fn Only remove the listeners that match this function.
     * @param {*} context Only remove the listeners that have this context.
     * @param {Boolean} once Only remove one-time listeners.
     * @returns {EventEmitter} `this`.
     * @public
     */
    public removeListener(event: (string | Symbol), fn: Function, context: any, once: boolean): EventEmitter;
    /**
     * Remove all listeners, or those of the specified event.
     *
     * @param {(String|Symbol)} [event] The event name.
     * @returns {EventEmitter} `this`.
     * @public
     */
    public removeAllListeners(event?: (string | Symbol)): EventEmitter;
    off: any;
    addListener: any;
}
declare namespace EventEmitter {
    export { prefix as prefixed };
    export { EventEmitter };
}
/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
declare function Events(): void;
declare class Events {
}
declare var prefix: string;
