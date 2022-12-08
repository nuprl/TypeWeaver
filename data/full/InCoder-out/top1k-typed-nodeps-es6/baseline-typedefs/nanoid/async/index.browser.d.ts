export declare let random: (bytes: any) => Promise<Uint8Array>;
export declare let customAlphabet: (alphabet: any, defaultSize?: number) => (size?: number) => Promise<string>;
export declare let nanoid: (size?: number) => Promise<string>;
