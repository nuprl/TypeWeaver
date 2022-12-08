/// <reference types="node" />
export declare const DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
export declare const URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
export default function v35(name: string, version: number, hashfunc: number): {
    (value: number, namespace: number, buf: Buffer, offset: number): string | Buffer;
    name: string;
    DNS: string;
    URL: string;
};
