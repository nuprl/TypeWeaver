export default function map(promises: any[], mapFn: Function, label?: string): Promise;
export class MapEnumerator extends Enumerator {
    constructor(Constructor: any, entries: any, mapFn: any, label: any);
    _init(Constructor: any, input: any, bool: any, label: any, mapFn: any): void;
    _mapFn: any;
    _setResultAt(state: any, i: any, value: any, firstPass: any): void;
}
import Promise from "./promise";
import { default as Enumerator } from "./enumerator";
