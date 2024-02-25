export default process;
declare namespace process {
    export function nextTick(fun: any, ...args: any[]): void;
    export const title: string;
    export const browser: boolean;
    export const env: {};
    export const argv: any[];
    export const version: string;
    export const versions: {};
    export { noop as on };
    export { noop as addListener };
    export { noop as once };
    export { noop as off };
    export { noop as removeListener };
    export { noop as removeAllListeners };
    export { noop as emit };
    export { noop as prependListener };
    export { noop as prependOnceListener };
    export function listeners(name: any): any[];
    export function binding(name: any): never;
    export function cwd(): string;
    export function chdir(dir: any): never;
    export function umask(): number;
}
declare function noop(): void;
