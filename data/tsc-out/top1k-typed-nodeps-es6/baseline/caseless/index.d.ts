export default function _default(dict: any): Caseless;
export function httpify(resp: any, headers: any): Caseless;
declare function Caseless(dict: any): void;
declare class Caseless {
    constructor(dict: any);
    dict: any;
    set(name: any, value: any, clobber: any): string | false;
    has(name: any): string | false;
    get(name: any): undefined;
    swap(name: any): void;
    del(name: any): boolean;
}
export {};
