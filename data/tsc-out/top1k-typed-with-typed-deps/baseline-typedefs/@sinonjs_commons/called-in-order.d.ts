export = calledInOrder;
declare function calledInOrder(spies: SinonProxy[] | SinonProxy, ...args: any[]): boolean;
declare namespace calledInOrder {
    export { SinonProxy };
}
type SinonProxy = {
    calledBefore: Function;
    id: string;
    callCount: number;
};
