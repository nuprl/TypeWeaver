export { urlAlphabet } from "./url-alphabet/index.js";
export function random(bytes: any): Uint8Array;
export function customRandom(alphabet: any, defaultSize: any, getRandom: any): (size?: any) => string;
export function customAlphabet(alphabet: any, size?: number): (size?: any) => string;
export function nanoid(size?: number): string;
