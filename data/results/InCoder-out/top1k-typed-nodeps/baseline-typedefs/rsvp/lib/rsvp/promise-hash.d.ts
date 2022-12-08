import Enumerator from './enumerator';
export default class PromiseHash extends Enumerator {
    constructor(Constructor: any, object: any, abortOnReject: boolean, label: any);
    _init(Constructor: any, object: any): void;
    _enumerate(input: any): void;
}
