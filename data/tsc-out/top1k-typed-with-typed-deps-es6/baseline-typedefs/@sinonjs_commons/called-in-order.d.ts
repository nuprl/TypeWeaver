export default calledInOrder;
export type SinonProxy = {
    calledBefore: Function;
    id: string;
    callCount: number;
};
declare function calledInOrder(spies: SinonProxy[] | SinonProxy, ...args: any[]): boolean;
