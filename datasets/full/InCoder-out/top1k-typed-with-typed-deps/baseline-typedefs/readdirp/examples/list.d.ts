declare const readdirp: {
    (root: any, options?: {}): ReaddirpStream;
    promise: (root: any, options?: {}) => Promise<unknown>;
    ReaddirpStream: typeof ReaddirpStream;
    default: any;
};
declare const read: (directory: any) => Promise<void>;
