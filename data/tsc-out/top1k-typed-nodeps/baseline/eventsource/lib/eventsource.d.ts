export = EventSource;
/**
 * Creates a new EventSource object
 *
 * @param {String} url the URL to which to connect
 * @param {Object} [eventSourceInitDict] extra init params. See README for details.
 * @api public
 **/
declare function EventSource(url: string, eventSourceInitDict?: any): void;
declare class EventSource {
    /**
     * Creates a new EventSource object
     *
     * @param {String} url the URL to which to connect
     * @param {Object} [eventSourceInitDict] extra init params. See README for details.
     * @api public
     **/
    constructor(url: string, eventSourceInitDict?: any);
    reconnectInterval: number;
    connectionInProgress: boolean;
    _close: () => void;
    constructor: typeof EventSource;
    CONNECTING: number;
    OPEN: number;
    CLOSED: number;
    /**
     * Closes the connection, if one is made, and sets the readyState attribute to 2 (closed)
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/EventSource/close
     * @api public
     */
    close(): void;
    /**
     * Emulates the W3C Browser based WebSocket interface using addEventListener.
     *
     * @param {String} type A string representing the event type to listen out for
     * @param {Function} listener callback
     * @see https://developer.mozilla.org/en/DOM/element.addEventListener
     * @see http://dev.w3.org/html5/websockets/#the-websocket-interface
     * @api public
     */
    addEventListener(type: string, listener: Function): void;
    /**
     * Emulates the W3C Browser based WebSocket interface using dispatchEvent.
     *
     * @param {Event} event An event to be dispatched
     * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent
     * @api public
     */
    dispatchEvent(event: Event): void;
    /**
     * Emulates the W3C Browser based WebSocket interface using removeEventListener.
     *
     * @param {String} type A string representing the event type to remove
     * @param {Function} listener callback
     * @see https://developer.mozilla.org/en/DOM/element.removeEventListener
     * @see http://dev.w3.org/html5/websockets/#the-websocket-interface
     * @api public
     */
    removeEventListener(type: string, listener: Function): void;
}
declare namespace EventSource {
    const CONNECTING: number;
    const OPEN: number;
    const CLOSED: number;
}
/**
 * W3C Event
 *
 * @see http://www.w3.org/TR/DOM-Level-3-Events/#interface-Event
 * @api private
 */
declare function Event(type: any, optionalProperties: any): void;
