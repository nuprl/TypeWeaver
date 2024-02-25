export function random(bytes: any): Promise<Uint8Array>;
export function customAlphabet(alphabet: any, defaultSize?: number): (size?: number) => Promise<string>;
export function nanoid(size?: number): Promise<string>;
