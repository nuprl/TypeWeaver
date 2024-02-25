export const themes: {};
export const styles: {};
export const supportsColor: (stream: any) => false | {
    level: any;
    hasBasic: boolean;
    has256: boolean;
    has16m: boolean;
};
export const enabled: boolean;
export function enable(): void;
export function disable(): void;
export function stripColors(str: any): string;
export function strip(str: any): string;
export function stylize(str: any, style: any): any;
export function setTheme(theme: any): void;
export const trap: (text: any, options: any) => string;
export const zalgo: (text: any, options: any) => string;
export namespace maps {
    const america: (letter: any, i: any, exploded: any) => any;
    const zebra: (letter: any, i: any, exploded: any) => any;
    const rainbow: (letter: any, i: any, exploded: any) => any;
    const random: (letter: any, i: any, exploded: any) => any;
}
