export = orderByFirstCall;
declare function orderByFirstCall(spies: SinonProxy[] | SinonProxy): SinonProxy[];
declare namespace orderByFirstCall {
    export { SinonProxy };
}
type SinonProxy = {
    getCall: Function;
};
