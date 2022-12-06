/// <reference types="node" />
import { Duplex } from 'stream';
declare function createWebSocketStream(ws: WebSocket, options: any): Duplex;
export default createWebSocketStream;
