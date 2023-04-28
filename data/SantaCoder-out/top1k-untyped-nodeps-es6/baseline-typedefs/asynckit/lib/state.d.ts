export default state;
declare function state(list: Array<any>, sortMethod: Function): {
    index: number;
    keyedList: string[];
    jobs: {};
    results: {};
    size: number;
};
