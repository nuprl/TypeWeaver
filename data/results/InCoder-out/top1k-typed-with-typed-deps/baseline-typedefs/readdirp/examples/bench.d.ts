declare const readdirp: {
    (root: any, options?: {}): ReaddirpStream;
    promise: (root: any, options?: {}) => Promise<unknown>;
    ReaddirpStream: typeof ReaddirpStream;
    default: any;
};
declare function logMem(i: number): void;
declare const read: (directory: any) => Promise<void>;
