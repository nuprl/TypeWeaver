declare class InterceptorManager {
    constructor();
    use(fulfilled: any, rejected: any, options: any): number;
    eject(id: any): void;
    clear(): void;
    forEach(fn: any): void;
}
export default InterceptorManager;
