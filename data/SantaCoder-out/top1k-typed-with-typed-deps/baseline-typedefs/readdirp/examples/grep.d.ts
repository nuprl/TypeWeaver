declare const createReadStream: any;
declare const es: any;
declare const readdirp: {
    (root: any, options?: {}): ReaddirpStream;
    promise: (root: any, options?: {}) => Promise<unknown>;
    ReaddirpStream: typeof ReaddirpStream;
    default: any;
};
declare const findLinesMatching: (searchTerm: any) => any;
