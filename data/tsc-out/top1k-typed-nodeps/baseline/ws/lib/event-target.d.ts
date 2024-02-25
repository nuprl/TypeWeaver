/**
 * Class representing a close event.
 *
 * @extends Event
 */
export class CloseEvent extends Event {
    /**
     * Create a new `CloseEvent`.
     *
     * @param {String} type The name of the event
     * @param {Object} [options] A dictionary object that allows for setting
     *     attributes via object members of the same name
     * @param {Number} [options.code=0] The status code explaining why the
     *     connection was closed
     * @param {String} [options.reason=''] A human-readable string explaining why
     *     the connection was closed
     * @param {Boolean} [options.wasClean=false] Indicates whether or not the
     *     connection was cleanly closed
     */
    constructor(type: string, options?: {
        code?: number;
        reason?: string;
        wasClean?: boolean;
    });
    /**
     * @type {Number}
     */
    get code(): number;
    /**
     * @type {String}
     */
    get reason(): string;
    /**
     * @type {Boolean}
     */
    get wasClean(): boolean;
    [kCode]: number;
    [kReason]: string;
    [kWasClean]: boolean;
}
/**
 * Class representing an error event.
 *
 * @extends Event
 */
export class ErrorEvent extends Event {
    /**
     * Create a new `ErrorEvent`.
     *
     * @param {String} type The name of the event
     * @param {Object} [options] A dictionary object that allows for setting
     *     attributes via object members of the same name
     * @param {*} [options.error=null] The error that generated this event
     * @param {String} [options.message=''] The error message
     */
    constructor(type: string, options?: {
        error?: any;
        message?: string;
    });
    /**
     * @type {*}
     */
    get error(): any;
    /**
     * @type {String}
     */
    get message(): string;
    [kError]: any;
    [kMessage]: string;
}
/**
 * Class representing an event.
 */
export class Event {
    /**
     * Create a new `Event`.
     *
     * @param {String} type The name of the event
     * @throws {TypeError} If the `type` argument is not specified
     */
    constructor(type: string);
    /**
     * @type {*}
     */
    get target(): any;
    /**
     * @type {String}
     */
    get type(): string;
    [kTarget]: any;
    [kType]: string;
}
export namespace EventTarget {
    /**
     * Register an event listener.
     *
     * @param {String} type A string representing the event type to listen for
     * @param {Function} listener The listener to add
     * @param {Object} [options] An options object specifies characteristics about
     *     the event listener
     * @param {Boolean} [options.once=false] A `Boolean` indicating that the
     *     listener should be invoked at most once after being added. If `true`,
     *     the listener would be automatically removed when invoked.
     * @public
     */
    function addEventListener(type: string, listener: Function, options?: {
        once?: boolean;
    }): void;
    /**
     * Remove an event listener.
     *
     * @param {String} type A string representing the event type to remove
     * @param {Function} handler The listener to remove
     * @public
     */
    function removeEventListener(type: string, handler: Function): void;
}
/**
 * Class representing a message event.
 *
 * @extends Event
 */
export class MessageEvent extends Event {
    /**
     * Create a new `MessageEvent`.
     *
     * @param {String} type The name of the event
     * @param {Object} [options] A dictionary object that allows for setting
     *     attributes via object members of the same name
     * @param {*} [options.data=null] The message content
     */
    constructor(type: string, options?: {
        data?: any;
    });
    /**
     * @type {*}
     */
    get data(): any;
    [kData]: any;
}
declare const kCode: unique symbol;
declare const kReason: unique symbol;
declare const kWasClean: unique symbol;
declare const kError: unique symbol;
declare const kMessage: unique symbol;
declare const kTarget: unique symbol;
declare const kType: unique symbol;
declare const kData: unique symbol;
export {};
