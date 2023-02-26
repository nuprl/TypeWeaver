export declare const DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
export declare const URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
export default function v35(name: string, version: number, hashfunc: any): {
    (value: string, namespace: string, buf: Uint8Array, offset: number): string | Uint8Array;
    name: string;
    DNS: string;
    URL: string;
};
