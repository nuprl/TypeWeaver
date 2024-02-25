export = createWebSocketStream;
/**
 * Wraps a `WebSocket` in a duplex stream.
 *
 * @param {WebSocket} ws The `WebSocket` to wrap
 * @param {Object} [options] The options for the `Duplex` constructor
 * @return {Duplex} The duplex stream
 * @public
 */
declare function createWebSocketStream(ws: WebSocket, options?: any): Duplex;
import { Duplex } from "stream";
