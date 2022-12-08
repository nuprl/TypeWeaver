import { default as Enumerator } from './enumerator';
export declare class MapEnumerator extends Enumerator {
    constructor(Constructor: any, entries: any, mapFn: any, label: any);
    _init(Constructor: any, input: any, bool: any, label: any, mapFn: any): void;
    _setResultAt(state: any, i: any, value: any, firstPass: any): void;
}
export default function map(promises: string, mapFn: string, label: string): any[];
