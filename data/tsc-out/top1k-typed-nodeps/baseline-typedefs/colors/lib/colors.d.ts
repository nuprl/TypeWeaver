export const themes: {};
export const styles: {};
export const supportsColor: typeof import("./system/supports-colors").supportsColor;
export const enabled: boolean;
export function enable(): void;
export function disable(): void;
export function stripColors(str: any): string;
export function strip(str: any): string;
export function stylize(str: any, style: any): any;
export function setTheme(theme: any): void;
export const trap: typeof import("./custom/trap");
export const zalgo: typeof import("./custom/zalgo");
export namespace maps {
    const america: (letter: any, i: any, exploded: any) => any;
    const zebra: (letter: any, i: any, exploded: any) => any;
    const rainbow: (letter: any, i: any, exploded: any) => any;
    const random: (letter: any, i: any, exploded: any) => any;
}
