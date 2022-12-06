/// <reference types="node" />
declare const benchmark: any;
declare const crypto: any;
declare const WebSocket: any;
declare const Receiver: any;
declare const Sender: any;
declare const options: {
    fin: boolean;
    rsv1: boolean;
    mask: boolean;
    readOnly: boolean;
};
declare function createBinaryFrame(length: number): Buffer;
declare const pingFrame1: Buffer;
declare const textFrame: Buffer;
declare const pingFrame2: Buffer;
declare const binaryFrame1: Buffer;
declare const binaryFrame2: Buffer;
declare const binaryFrame3: Buffer;
declare const binaryFrame4: Buffer;
declare const suite: any;
declare const receiver: Receiver;
