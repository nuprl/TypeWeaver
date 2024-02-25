export namespace cursor {
    function to(x: any, y: any): string;
    function move(x: any, y: any): string;
    function up(count?: number): string;
    function down(count?: number): string;
    function forward(count?: number): string;
    function backward(count?: number): string;
    function nextLine(count?: number): string;
    function prevLine(count?: number): string;
    const left: string;
    const hide: string;
    const show: string;
    const save: string;
    const restore: string;
}
export namespace scroll {
    export function up_1(count?: number): string;
    export { up_1 as up };
    export function down_1(count?: number): string;
    export { down_1 as down };
}
export namespace erase {
    export const screen: string;
    export function up_2(count?: number): string;
    export { up_2 as up };
    export function down_2(count?: number): string;
    export { down_2 as down };
    export const line: string;
    export const lineEnd: string;
    export const lineStart: string;
    export function lines(count: any): string;
}
export const beep: "\u0007";
export namespace clear {
    const screen_1: string;
    export { screen_1 as screen };
}
