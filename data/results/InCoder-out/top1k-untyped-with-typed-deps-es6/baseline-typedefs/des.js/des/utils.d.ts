/// <reference types="node" />
export declare const readUInt32BE: (bytes: Buffer, off: number) => number;
export declare const writeUInt32BE: (bytes: Buffer, value: number, off: number) => void;
export declare const ip: (inL: number, inR: number, out: number, off: number) => void;
export declare const rip: (inL: number, inR: number, out: number, off: number) => void;
export declare const pc1: (inL: number, inR: number, out: number, off: number) => void;
export declare const r28shl: (num: number, shift: number) => number;
export declare const pc2: (inL: number, inR: number, out: number, off: number) => void;
export declare const expand: (r: number, out: number, off: number) => void;
export declare const substitute: (inL: number, inR: number) => number;
export declare const permute: (num: number) => number;
export declare const padSplit: (num: number, size: number, group: number) => string;
