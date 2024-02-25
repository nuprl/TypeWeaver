export default orderByFirstCall;
export type SinonProxy = {
    getCall: Function;
};
declare function orderByFirstCall(spies: SinonProxy[] | SinonProxy): SinonProxy[];
