declare class Promise {
    constructor(resolver: any, label: any);
    _onError(reason: any): void;
    catch(onRejection: any, label: any): any;
    finally(callback: any, label: any): any;
}
export default Promise;
