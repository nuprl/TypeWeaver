export { urlAlphabet } from './url-alphabet/index.js';
export declare let random: (bytes: any) => Uint8Array;
export declare let customRandom: (alphabet: any, defaultSize: any, getRandom: any) => (size?: any) => string;
export declare let customAlphabet: (alphabet: any, size?: number) => (size?: any) => string;
export declare let nanoid: (size?: number) => string;
